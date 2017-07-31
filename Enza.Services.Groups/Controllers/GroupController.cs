using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Enza.Groups.BusinessAccess.Interfaces;
using Enza.Groups.Entities.BDTOs.Args;
using Enza.Groups.Entities.Constants;
using Enza.Services.Core.Abstracts;
using Enza.Services.API.Discovery;
using Enza.Discovery.Entities;
using Enza.Entities.Entities.BDTOs.Args;
using Enza.Services.API.Entities;

namespace Enza.Services.Groups.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix(RouteConstants.API_GROUPS)]   
    public class GroupController : ApiControllerBase
    {
        private readonly IBALEntityGroup balGroup;
        private readonly IBALEntityInGroup balEntityInGroup;


        /// <summary>
        /// 
        /// </summary>
        /// <param name="balGroup"></param>
        /// <param name="balEntityInGroup"></param>
        public GroupController(IBALEntityGroup balGroup, IBALEntityInGroup balEntityInGroup)
        {
            this.balGroup = balGroup;
            this.balEntityInGroup = balEntityInGroup;
        }

        /// <summary>
        /// Method defined to get all group record of logged in user.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("groups")]
        [HttpGet]
        public async Task<IHttpActionResult> GetGroups([FromUri] GroupRequestArgs args)
        {
            if (args == null)
                args = new GroupRequestArgs();
            args.User = User.Identity.Name;
            var createdGroup = await balGroup.GetGroups(args);
            return JsonResult(createdGroup.Tables[0]);
                     
        }

        /// <summary>
        /// Creates the groups with its group lines. Multiple groups and their lines can be created at a time.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("creategroup")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateGroup([FromBody] IEnumerable<CreateGroupRequestArgs> args)
        {
            if (args == null)
                return BadRequest("Please provide args.");
           if(!ModelState.IsValid)
            {
                return BadRequest("Validatation failed in few fields.");
            }
            var groups = args.ToList();
            #region Get EZID from Entity Service for creating EZID of Group

            var discoveryAPI = new DiscoveryAPI();
            var url = await discoveryAPI.GetServiceUrlAsync(MicroServices.ENTITIES);
            var entityAPI = new EntitiesAPI(url);
            var EZIDS = await entityAPI.CreateEZIDsAsync(new GenerateEZIDRequestArgs
            {
                ETC = "GRP",
                TotalEZID = groups.Count
            });

            #endregion

            if (groups.Count != EZIDS.Count)
            {
                return BadRequest("Couldn't generate EZIDs for selected groups.");
            }
            //create groups first
            int i = 0;
            var groupsWithLines = groups.Select(group =>
            {
                group.EZID = EZIDS[i++];
                group.User = User.Identity.Name;
                return group;
            }).ToList();

            var rs = await balGroup.CreateGroupsWithLines(groupsWithLines);
            return JsonResult(rs);
        }

        /// <summary>
        /// Method defined to Get Group line record from EntityInGroup table by providing specific EZID for Group.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        /// <exception cref="HttpResponseException"></exception>
        [Route("GroupLine")]
        [HttpGet]
        
        public async Task<IHttpActionResult> GetGroupLine([FromUri] GroupLineRequestArgs args)
        {
            if (args == null)
                return BadRequest("Please provide args.");
            if (!args.Validate())
            {
                return BadRequest(string.Join(Environment.NewLine, args.Errors));
            }
            var result = await balEntityInGroup.GetLinesInGroup(args);                
            return JsonResult(result.Tables[0]);            
        }
        
        /// <summary>
        ///Method defined to Create Group line record in EntityInGroup table by providing specific EZID of line and Group.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("CreateGroupLines")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateLineInGroup([FromBody] CreateGroupLineRequestArgs args)
        {
            if (args == null)
                return BadRequest("Please provide args.");

            if (!args.Validate())
            {
                return BadRequest(string.Join(Environment.NewLine, args.Errors));
            }
            var result = await balEntityInGroup.CreateLinesInGroup(args);
            return JsonResult(result);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balGroup?.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}
