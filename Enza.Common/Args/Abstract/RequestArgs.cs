using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Enza.Common.Args.Abstract
{
    public abstract class RequestArgs
    {
        protected RequestArgs()
        {
            Errors = new List<ValidationResult>();
        }

        [JsonIgnore]
        public List<ValidationResult> Errors { get; set; }

        public bool Validate()
        {
            return Validator.TryValidateObject(this, new ValidationContext(this), Errors, true);
        }
    }
}
