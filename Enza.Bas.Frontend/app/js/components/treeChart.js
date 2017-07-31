import * as d3 from 'd3';
import React from 'react';
import ReactFauxDOM from 'react-faux-dom';

class treeChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            newTreeRootId: this.props.treeRootId || this.props.params.id || '',
            treeRootId: this.props.treeRootId
        }
        this.updateTreeRootId = this.updateTreeRootId.bind(this);
        this.fetchHierarchy = this.fetchHierarchy.bind(this);
        this.triggerFetchHierarchy = this.triggerFetchHierarchy.bind(this);
    }

    updateTreeRootId(e) {
        if (e.target.value !== "") {
            e.target.classList = "";
        }
        this.setState({
            newTreeRootId: e.target.value
        })
    }

    triggerFetchHierarchy(e) {

        if ((e.which || e.keyCode) == 13) {
            //check if same record
            if (this.state.newTreeRootId != this.props.treeRootId)
                this.fetchHierarchy(this.state.newTreeRootId);
        }
    }

    fetchHierarchy(e) {
        if (this.refs.nextRootId.value == "") {
            this.refs.nextRootId.classList = "error";
            return;
        }
        if (this.refs.nextRootId.value != this.props.treeRootId)
            this.props.fetchHierarchy(this.state.newTreeRootId);
    }

    render() {

        // data for pedegree tree
        var myTreeData = this.props.treeHierarchyData,
            width = 800,
            height = 800,
            offsetMultiplier = 5,  //vertical separation between two spouse lines originating from same parent
            offsetHeightBy = 50,         // offset distance between generation for clarity
            tree = d3.tree().size([height, width]),
            containerSVG = ReactFauxDOM.createElement('svg'),
            svg = d3.select(containerSVG)
                .attr("width", width)
                .attr("height", height);

        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("fill", "none")
            .style("pointer-events", "all");


        svg = svg.append("g");


        //TODO: Need better algorithm as it is sort of hack right now, there seems to be endless scenario for crossing, and more managed algorithm should be devised for future.
        let sequence = [],                  // a variable to list node in the sequence as they should appear in the diagram.
            mapEZIDToCounter = {},
            treeRootId = this.props.treeRootId,
            hiddenNodesList = []; // array of Ezid hidden by clicking on the parents or its ancestors

        //if nodes are present for drawing tree.
        if (myTreeData.length > 1) {

            let treeRoot = myTreeData.filter(f => f.EZID == treeRootId)[0];
            //check if parent nodes are present or not;
            let mainParents = myTreeData.filter(f => f.EZID == treeRoot.Parent1 || f.EZID == treeRoot.Parent2);
            var mainParent1, mainParent2,
                dummyParent1ID = 100000000000,
                dummyParent2ID = 100000000001;

            if (mainParents.length == 0) {

                if (treeRoot.level == 0) {
                    //devise dummy parents if there are none;
                    mainParent1 = {
                        "EZID": dummyParent1ID,
                        "Name": "ParentA",
                        "Parent1": "",
                        "Parent2": "",
                        "level": -1,
                        "GenerationCode": "",
                        hidden: true,
                        no_parent: true
                    };
                    mainParent2 = {
                        "EZID": dummyParent2ID,
                        "Name": "ParentB",
                        "Parent1": "",
                        "Parent2": "",
                        "level": -1,
                        "GenerationCode": "",
                        hidden: true,
                        no_parent: true
                    };

                    myTreeData.push(mainParent1);
                    myTreeData.push(mainParent2);

                    //force root node to have dummy parents.
                    for (let i = 0; i < myTreeData.length; i++) {
                        if (myTreeData[i].EZID == treeRootId) {
                            myTreeData[i].Parent1 = dummyParent1ID
                            myTreeData[i].Parent2 = dummyParent2ID
                            myTreeData[i].no_parent = true;
                            break;
                        }
                    }
                }
            }
            else {
                // let treeRoot = myTreeData.filter(f=>f.EZID == treeRootId);
                mainParent1 = mainParents[0];
                mainParent2 = mainParents[1];
            }

            //push first parent
            if (mainParent1) {
                sequence.push(mainParent1);
                findChildren(mainParent1);
            }
            else {
                sequence.push(treeRoot);
                findChildren(treeRoot);
            }


            sequence = patchChildrensPosition(sequence);
            //push lastparent if not already there
            if (mainParent2 && sequence.filter(f => f.EZID == mainParent2.EZID).length == 0)
                sequence.push(mainParent2);

            //prepare the nodes for drawing as nested node along the sequence.
            let children = prepTreeChildren(sequence);

            let rootNode = Object.assign({
                    Name: "fake",
                    EZID: null,
                    id: 0,
                    hidden: true,
                    no_parent: true,

                    children: children
                }
            );

            let root = d3.hierarchy(rootNode);
            tree(root);
            var rootNodes = root.descendants();
            rootNodes.forEach(function (d) {
                if (d.depth == 1 && d.data.parent1 == dummyParent1ID)
                    d.y = 0
                else
                    d.y = (d.depth < 2 ) ? 50 : (d.depth * 100 - 50)
            });

            //if a node has multiple spouse then the spouse line(horizongal line ) origination from the primary parent
            // will over lap and it will be confusing in chart, so this variable will have source to target(s)
            // indexing so that the spouse/marriage line will be drawn at some integer multiplier of these indexes.
            var siblingLineOffset = [];

            //generate spouse lines array, i source -> target
            var siblings = generateSiblings(sequence);

            // draw the link lines to parent
            svg.selectAll("g.link")
                .data(root.descendants())
                .enter().append("path")
                .attr("class", (d) => d.data.EZID ? "link " + "path" + d.data.EZID : "link")
                .attr("d", elbow)
                .attr("data-hiddenByCount", 0);


            //First draw sibling line with blue line
            svg.selectAll(".sibling")
                .data(siblings)
                .enter().append("path")
                .attr("class", (d) => {
                    return d.data.ezid ? "sibling " + "sibling" + d.data.ezid : "sibling"
                })
                .attr("d", sblingLine)
                .attr("data-hiddenByCount", 0);

            // Create the node rectangles.
            let nodes = svg.selectAll("g.node")
                .data(root.descendants())
                .enter()
                .append("g")
                .attr("class", (d) => {
                    let classes = "node " + "node" + d.data.id + " ezid-" + d.data.EZID;


                    //fake nodes are hidden, only used for structure diagram thus are hidden :)
                    if (d.data.Name == "fake" || d.data.EZID == dummyParent1ID || d.data.EZID == dummyParent2ID) {
                        classes += " fake";
                    }
                    if (d.data.EZID == treeRootId)
                        classes += " treeRoot";

                    return classes;
                })
                .attr("data-hiddenByCount", 0)
                .attr("data-highlightedByCount", 0)
                .attr("id", function (d) {
                    return d.data.id;
                })
                .attr("display", (d) => d.hidden ? "none" : '')
                .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
                .append("foreignObject")
                .attr("height", 35)
                .attr("width", 130)
                .attr("x", "-20px")
                .attr("y", 0);

            //show details on hover
            svg.selectAll("g.node").on('mouseenter', function () {
                let nodeDiv = document.querySelector(".node" + this.component.id + " div"),
                    genCode = nodeDiv.getAttribute("data-gencode"),
                    name = nodeDiv.getAttribute("data-name"),
                    ezid = nodeDiv.getAttribute("data-ezid"),
                    parent1Ezid = nodeDiv.getAttribute("data-parent1ezid"),
                    parent2Ezid = nodeDiv.getAttribute("data-parent2ezid");

                let popupDiv = document.querySelector(".popupDetail");
                popupDiv.querySelector(".genCode").innerHTML = genCode == "" ? "" : "Generation Code: " + "<strong>" + genCode + "</strong>"
                popupDiv.querySelector(".ezid").innerHTML = "EZID: " + "<strong>" + ezid + "</strong>";
                popupDiv.querySelector(".name").innerHTML = "Name: " + "<strong>" + name + "</strong>";
                popupDiv.querySelector(".parent1Ezid").innerHTML = parent1Ezid == dummyParent1ID || parent1Ezid == "" ? "" : "EZID1: " + "<strong>" + parent1Ezid + "</strong>";
                popupDiv.querySelector(".parent2Ezid").innerHTML = parent2Ezid == dummyParent2ID || parent1Ezid == "" ? "" : "EZID2: " + "<strong>" + parent2Ezid + "</strong>";
                popupDiv.setAttribute("transform", "translate(" + (this.__data__.x) + "," + (this.__data__.y + 34) + ")")


            });


            //show link highlight on hover
            svg.selectAll('g.node').on("mouseover", function (d) {
                let paths = document.querySelectorAll(".path" + d.data.EZID);
                let siblings = document.querySelectorAll(".sibling" + d.data.EZID);


                siblings.forEach(s => s.classList.add("higlightPath"))
                paths.forEach(s => s.classList.add("higlightPath"))

            })

            //remove hover effect on mouseout
            svg.selectAll('g.node').on("mouseout", function (d) {
                let paths = document.querySelectorAll(".path" + d.data.EZID);
                let siblings = document.querySelectorAll(".sibling" + d.data.EZID);


                siblings.forEach(s => s.classList.remove("higlightPath"))
                paths.forEach(s => s.classList.remove("higlightPath"))
            });

            //click on node to highlight parent node.
            svg.selectAll('g.node').on("click", function (d) {
                if (isLeafTreeNode(d)) {

                    traceParent(d, !!d._traced);
                }
                else
                    toggleChildren(d);
            })


            let foreignDiv = nodes
                .append("div")
                .attr("class", "fcontainer")
                .attr("data-gencode", (d) => d.data.GenerationCode)
                .attr("data-name", (d) => d.data.Name)
                .attr("data-ezid", (d) => d.data.EZID)
                .attr("data-parent1ezid", (d) => d.data.Parent1)
                .attr("data-parent2ezid", (d) => d.data.Parent2);

            foreignDiv.append("p")
                .attr("class", "nodeName")
                .attr("title", d => d.data.Name)
                .html(d => d.data.Name);
        }

        /**
         * Give path point to draw connection between two parent
         *
         * @param {Object} d A spouse object containing source, target and EZID of descending node.
         * @return {string} path line between two spouses
         */
        function sblingLine(d) {
            //start poit
            let start = rootNodes.filter((f) => f.data.id == d.source.id)
            //end point
            let end = rootNodes.filter((f) => f.data.id == d.target.id)

            var offsetY = siblingLineOffset[d.source.id][d.target.id] * offsetMultiplier + offsetHeightBy;

            var offsetX = siblingLineOffset[d.source.id][d.target.id] * offsetMultiplier
            //define teh start coordinate and end co-ordinate
            var linedata = [];
            var yDisplacement = 34;
            //back link from lower generation  node to upper generation node
            if (start[0].y > end[0].y)
                linedata = [
                    {
                        x: start[0].x + offsetX,
                        y: start[0].y + yDisplacement
                    },
                    {
                        x: start[0].x + offsetX,
                        y: start[0].y + offsetY
                    },

                    {
                        x: end[0].x,
                        y: start[0].y + offsetY
                    },

                    {
                        x: end[0].x,
                        y: end[0].y + yDisplacement
                    }];

            //back link from high generation node to lower generation node.
            else if (start[0].y < end[0].y) {
                linedata = [
                    {
                        x: start[0].x + offsetX,
                        y: start[0].y + yDisplacement
                    },
                    {
                        x: start[0].x + offsetX,
                        y: end[0].y + offsetY
                    },

                    {
                        x: end[0].x,
                        y: end[0].y + offsetY
                    },

                    {
                        x: end[0].x,
                        y: end[0].y + yDisplacement
                    }];
            }

            //actual spouses
            else {

                linedata = [
                    {
                        x: start[0].x + offsetX,
                        y: start[0].y + yDisplacement
                    },
                    {
                        x: start[0].x + offsetX,
                        y: start[0].y + offsetY
                    },
                    {
                        x: end[0].x,
                        y: start[0].y + offsetY
                    },
                    {
                        x: end[0].x,
                        y: end[0].y + yDisplacement
                    }];

            }
            var pathIt = function (p) {
                let sPath = "M"
                p.forEach((f, i) => {
                    if (p.length - i == 1)
                        sPath += f.x + "," + f.y;
                    else
                        sPath += f.x + "," + f.y + "L";
                })
                return sPath
            }
            return pathIt(linedata);
        }

        /**
         * Draws the lines from child node to parent generation spouse line
         *
         * @param {Treenode} node Child node from which line originates
         * @return  {string} path  line between child to parent spouse line
         */
        function elbow(d) {
            if (d.data.no_parent) {
                return "M0,0L0,0";
            }
            else {
                let offsetIndex;
                if (isPrimaryParent(d.data.Parent1)) {
                    offsetIndex = siblingLineOffset[mapEZIDToCounter[d.data.Parent1]][mapEZIDToCounter[d.data.Parent2]]
                }
                else {
                    offsetIndex = siblingLineOffset[mapEZIDToCounter[d.data.Parent2]][mapEZIDToCounter[d.data.Parent1]]
                }

                let offsetY = offsetHeightBy - offsetIndex * offsetMultiplier

                return "M" + d.x + "," + d.y + "L" + d.x + "," + (d.y - offsetY);
            }
        }

        /**
         * Helper function to check if a node is leaf node, returns true if yes, false is no
         *
         * @param {Treenode} node to check if leaf node
         * @return  {boolean} true/false  based upon if a node is leaf node
         */
        function isLeaf(node) {
            return !myTreeData.filter((f) => f.Parent1 == node.EZID || f.Parent2 == node.EZID).length > 0
        }

        function isLeafTreeNode(node) {
            return !myTreeData.filter((f) => f.Parent1 == node.data.EZID || f.Parent2 == node.data.EZID).length > 0
        }

        /**
         * Helper function to find parent node recursively from leaf node to top level node and push to sequence
         *
         * @param {Treenode} node to start checking for parent node
         */
        function findParent(node) {

            //if node is starting level, return back
            if (node.level == 0) {
                if (sequence.filter(f => f.EZID == node.EZID).length == 0)
                    sequence.push(node)
                return;
            }

            let Parent2Obj = myTreeData.filter((f) => f.EZID == node.Parent2),
                Parent1Obj = myTreeData.filter((f) => f.EZID == node.Parent1);

            //if first parent (parent1) is secondary parent
            if (Parent1Obj[0].Parent1 == "" && Parent1Obj[0].Parent2 == "") {
                //push secondary parent(right wing) to sequence
                if (sequence.filter((f) => f.EZID == Parent1Obj[0].EZID).length == 0)
                    sequence.push(Parent1Obj[0]);
                //if starting level is reached abort going up
                if (Parent1Obj[0].level == 0) {
                    return;
                }
                //continue going up the tree to find parent node to push to sequence
                findParent(Parent2Obj[0])

            }
            //if sencond parent (parent2) is secondary parent
            else {
                //push secondary parent(right wing) to sequence
                // sequence.push(Parent2Obj[0]);
                if (sequence.filter((f) => f.EZID == Parent2Obj[0].EZID).length == 0)
                    sequence.push(Parent2Obj[0]);
                //if starting level is reached abort going up
                if (Parent1Obj[0].level == 0) {
                    return;
                }
                //continue going up the tree to find parent node to push to sequence
                findParent(Parent1Obj[0])
            }
        }


        function traceParent(node, traced) {
            //traced flag should tell if tracing parent from current selected node is done already
            if (traced) {
                if (!!node._traceHighlighted) {
                    //remove highlight
                    node._tracedParents.map((t) => {
                        let n = document.querySelector(".ezid-" + t.EZID);
                        let p = document.querySelector(".path" + t.EZID);
                        let s = document.querySelector(".sibling" + t.EZID);
                        let highlightCount = parseInt(n.getAttribute("data-highlightedByCount")) - 1
                        n.setAttribute("data-highlightedByCount", highlightCount);
                        if (highlightCount == 0) {
                            n.classList.remove("traceHighlighted");
                            p.classList.remove("traceHighlighted");
                            if (s)
                                s.classList.remove("traceHighlighted");
                        }
                    })
                }
                else {
                    //add highlight to parents
                    node._tracedParents.map((t) => {
                        let n = document.querySelector(".ezid-" + t.EZID);
                        let p = document.querySelector(".path" + t.EZID);
                        let s = document.querySelector(".sibling" + t.EZID);
                        let highlightCount = parseInt(n.getAttribute("data-highlightedByCount")) + 1
                        n.setAttribute("data-highlightedByCount", highlightCount);
                        n.classList.add("traceHighlighted");
                        p.classList.add("traceHighlighted");
                        if (s)
                            s.classList.add("traceHighlighted");
                    })
                }
                node._traceHighlighted = !node._traceHighlighted;

            }
            else
            // showing path to parent from selected leaf node
            {
                let startNode = myTreeData.filter((n) => n.EZID == node.data.EZID),
                    tracedParents = tracePrimaryParent(startNode[0], [startNode[0]]);
                //cache it for future
                node._tracedParents = tracedParents;
                //flag for later to find cached data
                node._traced = !node._traced;
                //flag to toggle trace highlights
                node._traceHighlighted = true;

                //loop thru
                tracedParents.map((t) => {
                    let n = document.querySelector(".ezid-" + t.EZID);
                    let p = document.querySelector(".path" + t.EZID);
                    let s = document.querySelector(".sibling" + t.EZID);
                    let highlightCount = parseInt(n.getAttribute("data-highlightedByCount"))
                    n.setAttribute("data-highlightedByCount", highlightCount + 1);
                    n.classList.add("traceHighlighted");
                    p.classList.add("traceHighlighted");
                    if (s)
                        s.classList.add("traceHighlighted");
                })

            }
        }


        function tracePrimaryParent(node, tracedParent) {
            //node has no parents, return traced parents up to now.
            if (node.Parent1 === "" && node.Parent2 === "")
                return tracedParent;

            let parents = myTreeData.filter((n) => n.EZID == node.Parent1 || n.EZID == node.Parent2);
            tracedParent.push(parents[0], parents[1])
            let primaryParent = isPrimaryParent(parents[0].EZID) ? parents[0] : parents[1];
            let otherParent = isPrimaryParent(parents[1].EZID) ? parents[1] : parents[0];
            if (isPrimaryParent(parents[0].EZID)) {
                primaryParent = parents[0];
                if (isPrimaryParent(parents[1].EZID)) {
                    //add parent to traced parents as well
                    let gParents = myTreeData.filter((n) => n.EZID == parents[1].Parent1 || n.EZID == parents[1].Parent2);
                    tracedParent.push(gParents[0], gParents[1])
                }
            }
            else {
                primaryParent = parents[1];
                if (isPrimaryParent(parents[0].EZID)) {
                    //add parent to traced parents as well
                    let gParents = myTreeData.filter((n) => n.EZID == parents[0].Parent1 || n.EZID == parents[0].Parent2);
                    tracedParent.push(gParents[0], gParents[1])
                }
            }

            return tracePrimaryParent(primaryParent, tracedParent);
        }

        /*
         * Handle toggle of children when parent node is clicked.
         * Maintain counter for hiding nodes(data-hiddenByCount), as cases might be if a node is being hidden by multiple ancestors along the path to top node.
         *
         * @param {Treenode} Treenode to start toggling children from in the tree structure.
         * */
        function toggleChildren(node) {
            let startNode = myTreeData.filter((f) => f.EZID == node.data.EZID)[0];
            if (node._tracedChildren == undefined) {
                node._childrenHidden = false;
                node._tracedChildren = [];
                if (!!node._siblings == false) {
                    node._siblings = findSiblings(node);
                }

            }
            node._tracedChildren = [];
            traceChildren(startNode, node);
            //if true, show/un-hide children
            if (node._childrenHidden) {

                node._tracedChildren.forEach(f => {

                    let node = document.querySelector(".ezid-" + f.EZID),
                        path = document.querySelector(".path" + f.EZID),
                        sibling = document.querySelector(".sibling" + f.EZID);

                    //show node and path to parents if data-hiddenByCounter is 1 ie . only one ancestor hid it earlier.
                    if (node.getAttribute("data-hiddenByCount") * 1 == 1) {
                        node.setAttribute("display", "");
                        path.setAttribute("display", "");
                        hiddenNodesList.splice(hiddenNodesList.indexOf(f.EZID), 1)

                    }
                    //check for valid sibling and show sibling/spouse line if data-hiddenByCounter is 1 ie . only one ancestor hid it earlier.
                    if (sibling && sibling.getAttribute("data-hiddenByCount") * 1 <= 1) {
                        // only process the sibling connection if it's not direct descendant of the parent,
                        if (!isSon(startNode, f))
                            sibling.setAttribute("display", ""); //setting other than none
                    }

                    //decrement the hiddenByCounter by 1
                    node.setAttribute("data-hiddenByCount", (node.getAttribute("data-hiddenByCount") * 1 == 0 ) ? 0 : node.getAttribute("data-hiddenByCount") * 1 - 1);
                    path.setAttribute("data-hiddenByCount", path.getAttribute("data-hiddenByCount") * 1 - 1);
                    if (!isSon(startNode, f))
                        if (sibling) {
                            sibling.setAttribute("data-hiddenByCount", sibling.getAttribute("data-hiddenByCount") * 1 - 1);
                        }
                })
                document.querySelector(".node.ezid-" + node.data.EZID).classList.remove("childrenHidden")
            }
            else {
                //hide children
                node._tracedChildren.forEach(f => {

                        let node = document.querySelector(".ezid-" + f.EZID),
                            path = document.querySelector(".path" + f.EZID),
                            sibling = document.querySelector(".sibling" + f.EZID);

                        //hide only if not hidden, else leave hidden
                        if (node.getAttribute("data-hiddenByCount") * 1 == 0) {
                            node.setAttribute("display", "none");
                            path.setAttribute("display", "none");

                            if (hiddenNodesList.indexOf(f.EZID) == -1)
                                hiddenNodesList.push(f.EZID);

                        }
                        //increment data-hiddenByCounter attribute to let know how many ancestor hid the node
                        node.setAttribute("data-hiddenByCount", node.getAttribute("data-hiddenByCount") * 1 + 1);
                        path.setAttribute("data-hiddenByCount", path.getAttribute("data-hiddenByCount") * 1 + 1);
                        // only process the sibling connection if it's not direct descendant of the parent,
                        if (!isSon(startNode, f))
                        //valid sibling, sometimes there is not sibling line associated with node like in case of secondary parent.
                            if (sibling) {
                                sibling.setAttribute("display", "none");  //hide node
                                sibling.setAttribute("data-hiddenByCount", sibling.getAttribute("data-hiddenByCount") * 1 + 1); // increment data-hiddenByCounter by 1
                            }
                    }
                )
                //set class 'chidrenHidden' to show the node different visually
                document.querySelector(".node.ezid-" + node.data.EZID).classList.add("childrenHidden");
            }
            //toggle flag to let know the state of children being shown/hidden
            node._childrenHidden = !node._childrenHidden;
        }


        /*
         * Function to take node and return EZID list of sibling/spouse nodes
         *
         * @param {Treenode} Treenode to find siblings/Spouse of
         * @return {Arraay}
         * */
        function findSiblings(node) {
            let nodeSiblings = [];
            siblings.forEach(f => {
                if (f.source.ezid == node.data.EZID)
                    nodeSiblings.push(f.target.ezid);
                else if (f.target.ezid == node.data.EZID)
                    nodeSiblings.push(f.source.ezid);
            })
            return nodeSiblings;
        }

        /*
         * Function to take node and return EZID list of sibling/spouse nodes
         *
         * @param {Object} father object to check if it is parent of son object.
         * @param {Object} son object to check if father object is it's parent
         * @return {boolean}
         * */
        function isSon(father, son) {
            return son.Parent1 == father.EZID || son.Parent2 == father.EZID
        }

        /*
         * Trace child nodes and push the valid children to provided Treenode's _tracedChildren property.
         *
         * @param {Object} startNode Object, raw object provided from server, starts the search / trace from this node.
         * @param {Object} node Treenode object where the traced nodes are pushed in its property _tracedChildren.
         * @return {boolean}
         * */
        function traceChildren(startNode, node) {
            let parentID = startNode.EZID;

            let children = myTreeData.filter((f) => f.Parent1 == parentID || f.Parent2 == parentID);
            if (children.length == 0) {
                return;
            }

            node._tracedChildren = node._tracedChildren.concat(children);
            children.forEach((n) => {

                //these conditions are getting more and more complex :(


                //if current node has sibling/spouse line connection with starting node then remove it from tracedChildren list
                if (node._siblings.indexOf(n.EZID) > -1) {
                    for (let i = 0; i < node._tracedChildren.length; i++) {
                        if (node._tracedChildren[i].EZID == n.EZID) {
                            node._tracedChildren.splice(i, 1);
                            break;
                        }
                    }
                }

                //find other parent of n which has no children, or which has other children which don't share the same parents.
                let otherParent = myTreeData.filter(f => (f.EZID == n.Parent1 && f.EZID !== parentID) || (f.EZID == n.Parent2 && f.EZID !== parentID));

                //other children of secondary parents / other parent
                let childrenOfOtherParent = myTreeData.filter(f => (f.Parent1 == otherParent[0].EZID || f.Parent2 == otherParent[0].EZID) && f.EZID !== n.EZID);

                //children sharing same parent , 2 at max , with male*female / female*male crossings
                let childrenOfSameParents = childrenOfOtherParent.filter(f => (f.Parent1 == parentID && f.Parent2 == otherParent[0].EZID) || (f.Parent2 == parentID && f.Parent1 == otherParent[0].EZID))


                let persistOtherParent = false;

                //if all of the childrensOfOtherParents are in the tracedChildren array then don't persist it.
                /* let tracedID = node._tracedChildren.map(f => f.EZID);
                 let traceCounter = 0;

                 for (let j = 0; j < childrenOfOtherParent.length; j++) {
                 if (tracedID.indexOf(childrenOfOtherParent[j].EZID) > -1) {
                 traceCounter++;
                 }
                 }

                 if (traceCounter == childrenOfOtherParent.length) {
                 persistOtherParent = true;
                 }*/

                let hiddenSiblingsLink = 0;
                //check if all children of other parents other than this one are in the hidden list then don't persist other parent
                if (hiddenNodesList.length > 0)
                    for (let k = 0; k < childrenOfOtherParent.length; k++) {
                        if (document.querySelector(".sibling" + childrenOfOtherParent[k].EZID).getAttribute("data-hiddenByCount") >= 1) {
                            hiddenSiblingsLink++;
                        }
                    }

                if (hiddenSiblingsLink == childrenOfOtherParent.length)
                    persistOtherParent = true
                /*   if (childrenOfOtherParent.length == childrenOfSameParents.length || childrenOfOtherParent.length == 0)
                 persistOtherParent = true;*/

                //if other parent are sibling/spouse of starting node then don't hide them
                let validOtherParent = siblings.filter(f => (f.source.ezid == otherParent[0].EZID && f.target.ezid == node.data.EZID) || (f.target.ezid == otherParent[0].EZID && f.source.ezid == node.data.EZID))


                //checks isSibilng of startnode, is start node
                if ((validOtherParent.length == 0) && (otherParent[0].EZID !== node.data.EZID) && persistOtherParent) {
                    node._tracedChildren.push(otherParent[0]);
                }
                return traceChildren(n, node)
            })
        }

        /**
         * Helper function to find child node recursively from given node to leaf node downwards and push to sequence, leaf node is also pushed in this method
         *
         * @param {Treenode} node to start checking for parent node
         */
        function findChildren(node) {
            if (isLeaf(node)) {
                if (sequence.filter((g) => g.EZID == node.EZID).length == 0)
                    sequence.push(node);
                findParent(node, node.level - 1);
            }
            else {

                //find child
                let children = myTreeData.filter((f) => f.Parent1 == node.EZID || f.Parent2 == node.EZID);
                children.forEach((f) => {
                    if (sequence.filter((g) => g.EZID == f.EZID).length == 0) {
                        sequence.push(f);
                    }
                    findChildren(f);

                })
            }
        }

        /**
         * Generates sequenced/ordered node to the depth / level recursively from given node to leaf node downwards and push to sequence, leaf node is also pushed in this method
         *
         * @param {Treenode} node to start checking for parent node
         */
        function prepTreeChildren(data) {
            let treeChildren = [],
                counter = 1000;
            data.forEach((f) => {
                ++counter;
                mapEZIDToCounter[f.EZID] = counter;
                let temp = (f.level == -1 || (f.Parent1 == "" && f.Parent2 == "")) ? Object.assign({}, f, {
                        id: counter,
                        no_parent: true
                    }) : Object.assign({}, f, {id: counter});

                for (let i = f.level; i > -1; i--) {
                    temp = Object.assign({},
                        {
                            Name: "fake",
                            id: ++counter,
                            no_parent: true,
                            hidden: true,
                            EZID: null,
                            children: [temp]
                        });
                }
                treeChildren.push(temp);
            })
            return treeChildren;
        }

        function isPrimaryParent(pId) {

            let node = sequence.filter(f => f.EZID == pId)[0];
            return !(node.Parent1 == "" && node.Parent2 == "")
        }

        function generateSiblings(data) {
            let siblings = []
            data.forEach((f) => {
                if (f.Parent1 !== "" && f.Parent2 !== "" && f.Parent1 !== dummyParent1ID) {

                    //find primary parent
                    let sId, tId, sEZID, tEZID
                    if (isPrimaryParent(f.Parent1)) {
                        sId = mapEZIDToCounter[parseInt(f.Parent1)];
                        tId = mapEZIDToCounter[parseInt(f.Parent2)];
                        sEZID = parseInt(f.Parent1);
                        tEZID = parseInt(f.Parent2);
                    }
                    else {
                        sId = mapEZIDToCounter[parseInt(f.Parent2)];
                        tId = mapEZIDToCounter[parseInt(f.Parent1)];
                        sEZID = parseInt(f.Parent2);
                        tEZID = parseInt(f.Parent1);
                    }

                    //sibling line is present already
                    if (siblingLineOffset[sId]) {
                        if (siblingLineOffset[sId][tId] == undefined)
                            siblingLineOffset[sId][tId] = Object.keys(siblingLineOffset[sId]).length + 1;
                    }
                    //new sibling line
                    else {
                        siblingLineOffset[sId] = {}
                        siblingLineOffset[sId][tId] = 1;
                    }

                    siblings.push({
                        source: {id: sId, ezid: sEZID},
                        target: {id: tId, ezid: tEZID},
                        data: {ezid: f.EZID}
                    });
                }
            })

            return siblings;
        }

        function patchChildrensPosition(data) {

            let sequence = data.concat([]);
            let len = sequence.length;
            for (let i = 2; i < len; i++) {
                let ezidSequence = sequence.map(f => f.EZID);
                let node = sequence[i],
                    nodeIndex = ezidSequence.indexOf(node.EZID),
                    parent1Index = ezidSequence.indexOf(node.Parent1),
                    parent2Index = ezidSequence.indexOf(node.Parent2);
                if (nodeIndex > parent1Index && nodeIndex > parent2Index && parent1Index != -1) {
                    let swapNode = sequence.splice(nodeIndex, 1);

                    if (parent1Index < parent2Index) {
                        //push node after parent1Index
                        sequence.splice(parent1Index + 1, 0, swapNode[0]);
                    }
                    else {
                        //push node after parent2Index
                        sequence.splice(parent2Index + 1, 0, swapNode[0]);
                    }
                }
            }
            return sequence;
        }

        //return control to react;
        return (
            <div className="treeChart">
                <h3 className="componentTitle">Hierarchy Data of { this.props.treeRootId || this.props.params.id}</h3>
                <div className="lotEntry">
                    <label> Search for </label>
                    <input type="text"
                           value={this.state.newTreeRootId}
                           ref="nextRootId"
                           placeholder="eg., 123456"
                           onChange={this.updateTreeRootId}
                           onKeyDown={this.triggerFetchHierarchy}
                    />
                    <button onClick={this.fetchHierarchy} title="Search"><i className="icon-right-small"></i>
                    </button>
                </div>
                { containerSVG.toReact()}
                <div className="popupDetail">
                    <div className="details">
                        <span className="genCode"> </span>
                        <span className="name"></span>
                        <span className="ezid"></span>
                        <span className="parent1Ezid"></span>
                        <span className="parent2Ezid"></span>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        //disabled sidebar
        this.props.disableSidebar();
        if (Object.keys(this.props.treeHierarchyData[0]).length == 0) {
            //empty obect received, so make a request to server to send some data.
            this.props.fetchHierarchy(this.props.params.id);
        }


        /* var svg = d3.select("svg")
         .call(d3.behavior.zoom()
         .on("zoom", function () {
         svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
         })
         );
         */
        var svg = d3.select("svg")

        //bind zoom
        var zoom = d3.zoom()
            .scaleExtent([0.5, 2])
            .on("zoom", zoomed);

        var zoomer = d3.select("svg > rect")
            .call(zoom);

        var g = d3.select("svg > g");
        zoomer.call(zoom.transform, d3.zoomIdentity.translate(100, 100));

        // var g = svg.select("g")
        function zoomed() {
            g.attr("transform", d3.event.transform);//The zoom and panning is affecting my G element which is a child of SVG
        }
    }

    componentWillReceiveProps(nextProp) {
         /*if(nextProp.treeRootId != this.props.treeRootId)
         console.log("Next set of props :" ,nextProp)*/
    }
}

export default treeChart;