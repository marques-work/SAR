
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import ReactJson from 'react-json-view';
import Tree from 'react-d3-tree';
// import statuses from './sar_statuses.json';
import sar_tree from './sar_tree.json';


class Main extends Component{

	constructor(props){
		super(props);
		// window.statuses = statuses;
		window.tree = sar_tree;
		window.dfs = (node, int)=>{
			let i = int;
			for(let n of node.children){
				i += dfs(n, int);
			}
			return i;
		}
		this.nodeMouseOver = this.nodeMouseOver.bind(this);
		this.nodeMouseClick = this.nodeMouseClick.bind(this);
		this.nodeMouseOut = this.nodeMouseOut.bind(this);
		this.disp;
		this.rect;
		this.selected = null;
	}

	componentDidMount(){	
		// document.querySelector('body').style.backgroundColor = "#333333";
		document.querySelector('body').style.backgroundColor = "#dddddd";
		this.disp = document.querySelector("#readContent");
		let svg = document.querySelector(".rd3t-tree-container svg g");
        this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.rect.setAttributeNS(null, 'x', -25);
        this.rect.setAttributeNS(null, 'y', -25);
        this.rect.setAttributeNS(null, 'height', '50');
        this.rect.setAttributeNS(null, 'width', '50');
        this.rect.setAttributeNS(null, 'fill', '#FF3333');
        this.rect.setAttributeNS(null, 'stroke', '#FF3333');
        this.rect.setAttributeNS(null, 'fill-opacity', '0.0');
        this.rect.setAttributeNS(null, 'stroke-opacity', '0.0');
        svg.appendChild(this.rect);

		document.addEventListener('keydown',(e)=>{

			if(this.selected){
				let len = this.selected.children ? this.selected.children.length : 0;
				switch(e.keyCode){
					case 40 : //down
					e.preventDefault();
					if(len === 1){
						this.selected = this.selected.children[0];
					}else if(len === 2){
						this.selected = this.selected.children[0];
					}else if(len === 3){
						this.selected = this.selected.children[1];
					}
					break;
					case 37 : //left
					e.preventDefault();
					if(len === 2 || len === 3){
						this.selected = this.selected.children[0];
					}
					break;
					case 39 : //right
					e.preventDefault();
					if(len === 2){
						this.selected = this.selected.children[1];
					}else if(len === 3){
						this.selected = this.selected.children[2];
					}
					break;
					case 38 : // up
					e.preventDefault();
					if(this.selected.parent){
						this.selected = this.selected.parent;
					}
					break;
				}
		        this.rect.setAttributeNS(null, 'x', this.selected.x-25);
		        this.rect.setAttributeNS(null, 'y', this.selected.y-25);
		        this.rect.setAttributeNS(null, 'stroke-opacity', '1.0');
		        this.disp.innerHTML = this.selected.status.content;
			}
		}, true);

	}

	nodeMouseOver(event){
		let content = event.status.content;
		// console.log(content);
		this.disp.innerHTML = content;

	}

	nodeMouseOut(event){
		if(this.selected){
			this.disp.innerHTML = this.selected.status.content;
		}
	}

	nodeMouseClick(event){
		console.log(event);
		this.selected = event;
        this.rect.setAttributeNS(null, 'x', event.x-25);
        this.rect.setAttributeNS(null, 'y', event.y-25);
        this.rect.setAttributeNS(null, 'stroke-opacity', '1.0');
	}

	render(){

		return(

			<div id="maindiv" style={{'display' : 'inline-block'}}>

			{/*<ReactJson src={sar_tree} collapsed={true} theme="monokai" />*/}

			<div className="treeDiv" style={{width: '60em', height: '150em', float: 'left'}}>
			<p style={{'width':'100%', 'paddingLeft': '270px'}}>click to select, use arrow keys to navigate selection</p>
			<Tree data={sar_tree} 
			orientation="vertical" 
			collapsible={false}
			zoom={0.6} 
			translate={{x:400, y:15}} 
			onMouseOver={this.nodeMouseOver}
			onMouseOut={this.nodeMouseOut}
			onClick={this.nodeMouseClick}
			/>
			</div>


			<div className="readout" style={{ 'width' : '520px', 'float' : 'right'}}>
			<p id="readContent" style={{'width':'100%', 'padding': '5px', 'paddingLeft': '10px', 'fontWeight':'bold', 'lineHeight': '1.2' }}></p>
			</div>
			</div>

		);
	}

}

ReactDOM.render(<Main />, document.getElementById('root'));



