/*
AsaJS v.0.4.1

(c) 2021 by RemXYZ. All rights reserved.
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.

https://github.com/RemXYZ/AsaJS
*/

//SETTINGs
const asa_setting = {
	D_D:{stop_before_the_border:false}
}
	
//GET ELEMENT 
let getEl = function (mix) {

	let result;
	if (mix instanceof Element & typeof mix == "object") {
		result = mix;
	}else {
		result = document.querySelectorAll(mix);

		for (let i = 0;result.length>i;i++) {
			let resultF = result[i];
			resultF.__proto__.CSSinfo = CSSinfo;
			resultF.__proto__.setCSS = setCSS;
			resultF.__proto__.find_top_node = find_top_node;
			resultF.__proto__.replaceAt = replaceAt;
			resultF.__proto__.getElCrd = getElCrd;
		}

		if (result.length == 1) {
			result = result[0];
		}
		
	}
	return result;
}

//SHOW CSS STYLE OF ELEMENT
const CSSinfo = function() {
return window.getComputedStyle(this,null);
}
// Object.prototype.CSSinfo = CSSinfo;

//SET CSS STYLE
const setCSS = function (mix,arg2) {
	if (typeof mix == "object") {
		for (const [key, value] of Object.entries(mix)) {
			this.style[key] = value;
		}
	}else if (typeof mix == "string" && typeof arg2 == "string") {
		this.style[mix] = arg2;
	}
}
// Object.prototype.setCSS = setCSS;

//Find top element
const find_top_node = function (mix) {
let el_par = this,
stop = true;
while(stop) {
	el_par = el_par.parentNode;
	if (!el_par.classList.contains(mix) || el_par.id != mix) {
		let el_chd = el_par.children;
		for (let chld of el_chd) {
			if (chld.classList.contains(mix) || chld.id == mix) {
				return chld;
				stop = false;
			}
		}
	}else {
		return el_par;
		break;
	}
	if (el_par == document.body) {
		stop = false;
	}
}
}
// Object.prototype.find_top_node = find_top_node;

//ADDED***
//replace sign with index
const replaceAt = function(txt, i, repl) {
	if (this instanceof Element & typeof this == "object") {
		const el = this;
		if (i !== undefined && i !== "" && i !== 0) {
			repl = i;
		}
		i = txt;

		if (el.tagName == "INPUT" || el.tagName == "TEXTAREA") {
			txt = el.value;
		}else {
			txt = el.innerHTML;
		}
	}

	if (repl == "" || repl == undefined) {
		return String(txt).substr(0, i) + String(txt).substr(i+1);
	}
	return String(txt).substr(0, i) + repl + String(txt).substr(i + repl.length);
}

function stopEvent (e) {
	//*cross-browser stop
	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);
	// e.preventDefault();
}

//Source https://ru.stackoverflow.com/questions/454972/%D0%9A%D0%B0%D0%BA-%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%B8%D1%82%D1%8C-%D1%87%D1%82%D0%BE-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-%D0%BD%D0%B5-%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9
function isEmptyObject(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			return false;
		}
	}
	return true;
}
//sourceEnd

//**WAS
	
//CREATE(MAKE) A ELEMENT
function mkEl (tag,att) {
	//att mast be a object
	//expample {"class":"input","type":"number"}
	let node = document.createElement(tag);
	if (typeof att == 'object') {
		for(var key in att) {
			if (att.hasOwnProperty(key)){
				node.setAttribute(key,att[key]);
			}
		}
	}
	return node;
}

//ADDED***
//sourse https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}
function getRandomInt(min, max, round) {
	let result = Math.random() * (max - min) + min;
	if (round === undefined || round == "" || round == 0) {
		round = 0;
	}
	return result.toFixed(round);
	}
//sourceEnd

//if less then 10
function if_lt_10 (unit) {
	if (unit < 10) {
		return "0"+unit;
	}
	return unit;
}
	
const get_my_time = function (lg) {

	let week_names = {
		ru:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
		en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
		ang:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
	}

	//yr = year, s_yr = short year, mo = month, wk = weak, d = day, h = hour, min = minute, s = secund
	const date = {};

	let NewDate = new Date();
	date.yr = NewDate.getFullYear();
	date.s_yr = date.yr;
	date.mo = NewDate.getMonth()+1;
	date.wk = NewDate.getDay();
	date.wk_name = false;
	date.d = NewDate.getDate();
	date.h = NewDate.getHours();
	date.min = NewDate.getMinutes();
	date.s = NewDate.getSeconds();

	if (lg !== undefined) {
		if (week_names[lg] !== undefined) {
			date.wk_name = week_names[lg][date.wk];
		}
	}

	if(date.mo > 12) {
		date.mo = 1;
	}
	
	//Check for correct DD.MM.YYYY format
	for (let key of Object.keys(date)) {
		if (key == "r") {
			continue;
		}
		if (key == "wk_name") {
			continue;
		}
		if (key == "s_yr") {
			let str = String(date.s_yr);
			date.s_yr = str.substr(2);
			continue;
		}
		date[key] = if_lt_10(date[key])
	}

	return date;
}
//WAS***




	
//DRAG AND DROP PART

//D_D it's function for start Drag&drop elements
//element has to be DOM object, with style : postition absolute!
//parent of element has to be DOM object
const getElCrd = function (el,par) {
	
	if (this instanceof Element & typeof this == "object") {
		par = el;
		el = this;
	}

	if (par === undefined) {
		par = document.body;
	}
	var el = {
		X:getCoords(el).left,
		Y:getCoords(el).top,
		x:el.offsetLeft,
		y:el.offsetTop,
		x_abs:getCoords(el).left - getCoords(par).left - (par.offsetWidth - par.clientWidth)/2,
		y_abs:getCoords(el).top - getCoords(par).top - (par.offsetWidth - par.clientWidth)/2,
		w:el.clientWidth,
		h:el.clientHeight,
		'x_bd':function(){return this.x+this.w},
		'y_bd':function(){return this.y+this.h},
		'x_abs_bd':function(){return this.X+this.w},
		'y_abs_bd':function(){return this.Y+this.h}
	}
	return el;
}
	
	// Drag&Drop PART
	
	let LastMouseBorder = [];

	function internalColision (el,par,my_event,speedX,speedY,both) {
	//SPEED must be a difference between first mouse coordinate and second coordinate
	//for exaple, we have fisrt x coordinate of the mouse (event.x) and after triggering by some function, we set another  x coordinate of the mouse, then we calculate difference between them. So the first x coodrinate f.e. was 200, then we run some function, where we get another x coordinate, f.e. 205, after that we calculate difference between these 2 number, and it will be 205 - 200 = 5, and 5 is the speed.


	const e = my_event === undefined || my_event == "" || my_event == false ? window.event : my_event;
	if (e != window.event) {
		console.error('The third argument must be an event or false or undefined or ""');
	}

	const speed = {
		x:speedX,
		y:speedY
	}
	let sOut = speed;
	sOut.colision = {
		top:false,
		right:false,
		bottom:false,
		left:false
	}
	sOut.mouseOut = {
		top:false,
		right:false,
		bottom:false,
		left:false
	}
	
	const parCrd = getElCrd(par);
	const elCrd = getElCrd(el,par);
	elCrd.x = elCrd.x_abs;
	elCrd.y = elCrd.y_abs;

	// total displacement
	let tldp = {
		x: elCrd.x + elCrd.w + speed.x,
		y: elCrd.y + elCrd.h + speed.y
	}

	//collision calculation
	let i;
	let isLastMeeting = LastMouseBorder.filter((item,ix)=>{i = ix; return item.el == el});
	let LastMeeting = {
		x:isLastMeeting[0] !== undefined ? isLastMeeting[0].x : 0,
		y:isLastMeeting[0] !== undefined ? isLastMeeting[0].y : 0,
		dir:isLastMeeting[0] !== undefined ? isLastMeeting[0].dir : 0,
		i:isLastMeeting[0] !== undefined ? i : 0
	};

	function sСalculation (untEl,untPar,dir) {

		if (!LastMouseBorder.some(i=>{
			if (i[untEl] == 0) {
				i[untEl] = e[untEl];
			}
			if (i.dir[untEl] === undefined) {
				i.dir[untEl] = dir;
			}
			return i.el == el;})
		) {
			let MouseBorderData = {el};
			MouseBorderData.dir = {};
			MouseBorderData.dir[untEl] = dir;
			MouseBorderData.x = 0;
			MouseBorderData.y = 0;
			MouseBorderData[untEl] = e[untEl];
			LastMouseBorder.push(MouseBorderData)
		}

		return dir == "+" ? 
			speed[untEl] - (tldp[untEl] - parCrd[untPar]):
			speed[untEl] - (elCrd[untEl] + speed[untEl]);
	}

	function trackLastMeeting (unit,ar_dir) {
		// if (withBorder == false) {
		// 	return 0;
		// }
		dir = ar_dir=="+" ? "-":"+";
		let unit_ = unit == "x" ? "y": "x";
		if (dir == "+") {
			if (LastMeeting[unit] != 0 && LastMeeting.dir[unit] == dir) {
				if (LastMeeting[unit] < e[unit]) {sOut[unit] = 0;}

				if (unit == "x") sOut.mouseOut.right = true;
				if (unit == "y") sOut.mouseOut.bottom = true;

				if (LastMeeting[unit] >= e[unit]) {
					LastMeeting[unit] = 0;
					if (LastMeeting[unit_] == 0) {
						if (LastMeeting[unit_] == 0) LastMouseBorder.splice(LastMeeting.i,1);
					}
				}
			}
		}
		if (dir == "-") {
			if (LastMeeting[unit] != 0 && LastMeeting.dir[unit] == dir) {
				if (LastMeeting[unit] > e[unit]) {sOut[unit] = 0;};

				if (unit == "x") sOut.mouseOut.left = true;
				if (unit == "y") sOut.mouseOut.top = true;

				if (LastMeeting[unit] <= e[unit]) {
					LastMeeting[unit] = 0;
					if (LastMeeting[unit_] == 0) {
						if (LastMeeting[unit_] == 0) LastMouseBorder.splice(LastMeeting.i,1);
					}
				}
			}
		}
	}

	// console.log(LastMeeting,LastMeeting.dir, e.x, e.y)
	//Mouse is going right
	if (speed.x > 0){
	//Right collision
		if (tldp.x >= parCrd.w) {
			sOut.x = sСalculation("x","w","+");	
			sOut.colision.right = true;
		}
		trackLastMeeting("x","+");
	}

	//Mouse is going left
	if (speed.x < 0) {
	//Left collision
		if (elCrd.x + speed.x <= 0) {
			sOut.x = sСalculation("x","w","-");
			sOut.colision.left = true;
		}

		trackLastMeeting("x","-");
	} 
	
	//Bottom collision
	if (speed.y > 0) {
		if (tldp.y >= parCrd.h) {
			sOut.y = sСalculation("y","h","+");
			sOut.colision.bottom = true;
		}

		trackLastMeeting("y","+");
	}
	//Top collision
	if (speed.y < 0) {
		if (elCrd.y + speed.y < 0) {
			sOut.y = sСalculation("y","h","-");
			sOut.colision.top = true;
		}

		trackLastMeeting("y","-");
	}
	
	//here I return the speed relative to the parent
	return sOut;
	
	}
	
	//D_D it's the function for start Drag&drop DOM elements
	
const D_D = function (main_el,par,callback,def_el,pos_x,pos_y) {
	//main_el is a trigger, elemet that start drag&drop
	//par is for collision, so element can't go out of parent
	//callback function
	//with pos_x and pos_y you can set position for element
	//with def_el you can move another element
	
	let el = main_el;
	if (this instanceof Element & typeof this == "object") {

	}
	el.__proto__.isDraging = true;
	el.__proto__.isResizing = false;
	
	//If User hasn't set the position of the element, this function will set it instead of User.
	const CSSinfo = el.CSSinfo();
	{
		if (CSSinfo.position == "static") {
			el.style.position = "absolute";
		}
	}
	//This will help not to highlight the text
	el.setAttribute('onselectstart',"return false");
	
	el.addEventListener('mousedown',mDownD_D);
	
	if (def_el !== undefined && def_el != 0 && def_el != ""){
		el = def_el;
	}
	
	if (pos_x !== undefined && !isNaN(pos_x) && pos_x != 0) {
		el.style.left = Number(pos_x)+"px";
	}
	if (pos_y !== undefined && !isNaN(pos_x) && pos_x != 0) {
		el.style.top = Number(pos_y)+"px";
	}
	
	function mDownD_D (e) {
		window.addEventListener('mousemove',mMoveD_D);
		window.addEventListener('mouseup',mUpD_D);
	
	let parentOut = false;
	
	if (par && asa_setting.D_D.stop_before_the_border == true) {
		//If mouse is out of parent territory, the element will not move
		par.addEventListener("mouseout",par_out);
		function par_out () {
			window.removeEventListener('mousemove',mMoveD_D);
		}
	
		//If mouse is over of parent territory, the element will move
		par.addEventListener("mouseover",par_over);
		function par_over () {
				window.addEventListener('mousemove',mMoveD_D);
			
		}
	
	}
	
		let elCrd = {
			x:el.offsetLeft,
			y:el.offsetTop,
			w:el.offsetWidth,
			h:el.offsetHeight
		}
	
		let mouse = {
			x:e.x,
			y:e.y
		}
	
	function mMoveD_D (e) {
	
	if (!el.isResizing){
	
	mouse.x = e.x - mouse.x;
	mouse.y = e.y - mouse.y;
	
	if (par) {
	//this if is for collision with parent
	let new_speed = internalColision (el,par,e,mouse.x,mouse.y);
	
	//and this for change coords of element
	elCrd.x += new_speed.x;
	elCrd.y += new_speed.y;
	
	}else {
		elCrd.x += mouse.x;
		elCrd.y += mouse.y;
	}
	
	//FDFEX part
	//here I set another position of element with css
		elCrd.X = getCoords(el).left;
		elCrd.Y = getCoords(el).top;
		if (callback !== undefined && callback !== "" && callback !== 0) {
			// 1 is moving
			let status = 1;
			if (typeof callback == "function") {
				callback({'event':e,'el':el, 'status':status, 'position':{'x':elCrd.X,'y':elCrd.Y}});
			}
		}
	
		{
			//here I set position for element
			el.style.left = elCrd.x + "px";
			el.style.top = elCrd.y + "px";
			//this function makes a loop
			mouse.x = e.x;
			mouse.y = e.y;
		}
	}
	
	//END OF MOVE DRAG AND DROP
	}
	//END OF MOVE DRAG AND DROP
	
	function mUpD_D (e) {
		LastMouseBorder = [];
		window.removeEventListener('mousemove',mMoveD_D);
		window.removeEventListener('mouseup',mUpD_D);
		if (par) {
			par.removeEventListener("mouseout",par_out);
			par.removeEventListener("mouseover",par_over);
		}
	
	//here I set another position of element with css
	
		if (callback !== undefined && callback !== "" && callback !== 0) {
			// 0 is moving
			let status = 0;
			if (typeof callback == "function") {
				callback({'event':e,'el':el, 'status':status, 'position':{'x':elCrd.X,'y':elCrd.Y}});
			}
		}
	
		el.style.boxShadow = "none";
		}
	}
	
	el.ondragstart = function() {
	  return false;
	};
	
	//END OF STOP DRAG AND DROP
	}
	//END OF STOP DRAG AND DROP
	


	//RESIZE PART
	//RESIZE START
	const resizeEl = function (el,par,fdfex,minX,minY,maxX,maxY,notSquare) {
	//*fdfex is a function definition expression. And a function definition expression it is a function is passed as an argument to another function
	//RESIZE START
	let isMouseOver = false;
	
	let Relements = [];
	
	

	//CREATE RESIZER
	let rDirBgColor = '#c9c9c9',
	rDirW_H = ['10px','10px'];
	let Rdirection = {
		"north":{
			width: rDirW_H[0],
			height: rDirW_H[1],
			top: '-1px',
			width: '100%',
			cursor: 'n-resize',
			background: rDirBgColor
		},
		"west":{
			width: rDirW_H[0],
			height: rDirW_H[1],
			left: '-1px',
			height: '100%',
			cursor: 'w-resize',
			// background: '#545454'
			background: rDirBgColor
		},
		"south":{
			width: rDirW_H[0],
			height: rDirW_H[1],
			bottom: '-1px',
			width: '100%',
			cursor: 's-resize',
			// background: '#262525'
			background: rDirBgColor
		},
		"east":{
			width: rDirW_H[0],
			height: rDirW_H[1],
			right: '-1px',
			height: '100%',
			cursor: 'e-resize',
			// background: '#8c8a8a'
			background: rDirBgColor
		},
		"nw":{
			top: '-1px',
			left: '-1px',
			cursor: 'nw-resize',
			// background: '#b7b7b7'
			background: rDirBgColor
		},
		"ne":{
			top: '-1px',
			right: '-1px',
			cursor: 'ne-resize',
			// background: '#6d6c6c',
			background: rDirBgColor
		},
		"sw":{
			bottom: '-1px',
			left: '-1px',
			cursor: 'sw-resize',
			// background: '#3d3c3c'
			background: rDirBgColor
		},
		"se":{
			bottom: '-1px',
			right: '-1px',
			cursor: 'se-resize',
			// background: '#000000'
			background: rDirBgColor
		}
	};
	let rDirArr = Object.entries(Rdirection);

	if (el.querySelectorAll(".AsaResizer").length < 8) {
		for (let i=0;i<8;i++) {
			Relements[i] = document.createElement("div");
			let Rel = getEl(Relements[i]);
			Rel.setCSS({
				position: 'absolute',
				width: '8px',
				height: '8px',
				borderRight: '5px',
				zIndex: '101'
			});
			Rel.setCSS(rDirArr[i][1]);

			Relements[i].classList.add("AsaResizer");
			Relements[i].classList.add(rDirArr[i][0]);
			el.append(Relements[i])
		}
	}
	
//END CREATE RESIZER
	
	el.addEventListener("mouseover",mover_R);
	el.addEventListener("mouseout",mout_R);
	
	function mover_R () {
		isMouseOver = true;
	}
			
	function mout_R () {
		isMouseOver = false;
	}
	
	let resizers = el.querySelectorAll(".AsaResizer");
	let currentResizer;
	
	//resizer diraction
	let rzr_dirct = {}
	//This option is optimized version :)
	el.addEventListener("mousedown", mDown_Rz);

	for (let resizer of resizers) {
	//Old option is not optimized version
	// resizer.addEventListener("mousedown", mDown_Rz);
	let t_rzr = resizer.classList[1];
	//layout ["+","+",0,0] means which value to remove and where to add (width and height)
	//["right","bottom","left","top"]
	//["east","south","west","north"]
	//["width","height","x_crd","y_crd"]
	if (t_rzr == "se") {rzr_dirct[t_rzr] = ["+","+",0,0];}
	if (t_rzr == "sw") {rzr_dirct[t_rzr] = ["-","+","+",0];}
	if (t_rzr == "ne") {rzr_dirct[t_rzr] = ["+","-",0,"+"];}
	if (t_rzr == "nw") {rzr_dirct[t_rzr] = ["-","-","+","+"];}
	if (t_rzr == "north") {rzr_dirct[t_rzr] = [0,"-",0,"+"];}
	if (t_rzr == "west") {rzr_dirct[t_rzr] = ["-",0,"+",0];}
	if (t_rzr == "south") {rzr_dirct[t_rzr] = [0,"+",0,0];}
	if (t_rzr == "east") {rzr_dirct[t_rzr] = ["+",0,0,0];}
	}
	
	function mDown_Rz (e) {
		currentResizer = e.target;

		//If I don't have the class name in the Rdirection object, I'll finish the function
		if(!rDirArr.some(i=>{return currentResizer.classList[1] == i[0];})) return 0;
		
		el.isResizing = true;
		
		
		window.addEventListener("mousemove", mMove_Rz);
		window.addEventListener("mouseup", mUp_Rz);
	
		let speed = {
			x:e.x,
			y:e.y
		}
	
	function mMove_Rz (e) {
	let elCrd = getElCrd(el);
	
	// console.log(elCrd)
	
		speed.x = e.x - speed.x;
		speed.y = e.y - speed.y;
	
	
		// console.log (speed.x, speed.y)
	
		//Free resize
		// if (notSquare == 1 || notSquare == true) { 
		function set_dctn (out_speed) {
			let s = {
				'w': out_speed.x,
				'h': out_speed.y,
				'x': out_speed.x,
				'y': out_speed.y,
				colision:{
					top:false,
					right:false,
					bottom:false,
					left:false
				}
			}
			function set_spd (op_w,op_h,op_x,op_y) {
				//Look, s.x and s.w is the same, only they are intended for another, c.x increases the !!width!!, and c.x increases / decreases the !!left!! position
				if (op_w == "+") {
					//MIN
					if (elCrd.w+s.w <= minX && s.w < 0) {
						s.w = s.w+(minX - (elCrd.w+s.w));
						s.x = 0;
						s.y = 0;
						s.h = 0;
					}
					//MAX
					if ((elCrd.w+s.w >= maxX && s.w > 0) & maxX != 0) {
						s.w = s.w - (elCrd.w+s.w - maxX);
						s.colision.right = true;
						s.x = 0;
						s.y = 0;
						s.h = 0;
					}
				}
				if (op_h == "+") {
					//MIN
					if (elCrd.h+s.h <= minY && s.h < 0) {
						s.h = s.h+(minY-(elCrd.h+s.h));
						s.x = 0;
						s.y = 0;
						s.w = 0;
					}
					//MAX
					if ((elCrd.h+s.h >= maxY && s.h > 0) & maxY != 0) {
						s.h = s.h - (elCrd.h+s.h - maxY);
						s.x = 0;
						s.y = 0;
						s.w = 0;
						s.colision.bottom = true;
					}
				}
				if (op_w == "-") {
					//MIN
					if (elCrd.w-s.w <= minX && s.w > 0) {
						s.w = s.w-(minX - (elCrd.w-s.w));
						s.x = 0;
						s.y = 0;
						s.h = 0;
					}
					//MAX
					if ((elCrd.w-s.w > maxX && s.w < 0) & maxX != 0) {
						s.w = maxX - elCrd.w;
						s.x = 0;
						s.y = 0;
						s.h = 0;
						s.colision.left = true;
					}
					s.w *= -1;
				}
				if (op_h == "-") {
					//MIN
					if (elCrd.h-s.h <= minY && s.h > 0) {
						s.h = s.h-(minY-(elCrd.h-s.h));
						s.x = 0;
						s.y = 0;
						s.w = 0;
					}
					//MAX
					if ((elCrd.h-s.h > maxY && s.h < 0) & maxY != 0) {
						s.h = maxY - elCrd.h;
						s.x = 0;
						s.y = 0;
						s.w = 0;
						s.colision.top = true;
					}
					s.h *= -1;
				}
				if (op_x == "-") {s.x *= -1;}
				if (op_y == "-") {s.y *= -1;}
				if (op_w == 0) {s.w = 0;}
				if (op_h == 0) {s.h = 0;}
				if (op_x == 0) {s.x = 0;}
				if (op_y == 0) {s.y = 0;}
	
				//Square
				if (notSquare === undefined || notSquare == 0 || notSquare == "") {
					const className = currentResizer.classList[1];
	
					if (className == "se") {
						if (Math.abs(s.w) >= Math.abs(s.h)) {
							s.h = s.w;
						}
						if (Math.abs(s.h) > Math.abs(s.w)) {
							s.w = s.h;
						}
					}
	
					if (className == "sw") {
						if (Math.abs(s.w) >= Math.abs(s.h)) {
							s.h = s.w;
						}
						if (Math.abs(s.h) > Math.abs(s.w)) {
							s.w = s.h;
							s.x = -1*s.h;
						}
					}
	
					if (className == "nw") {
						if (Math.abs(s.w) >= Math.abs(s.h)) {
							s.y = -1*s.w;
							s.h = s.w;
						}
						if (Math.abs(s.h) > Math.abs(s.w)) {
							s.w = s.h;
							s.x = -1*s.h;
						}
					}
	
					if (className == "ne") {
						if (Math.abs(s.w) >= Math.abs(s.h)) {
							s.h = s.w;
							s.y = -1*s.w;
						}
						if (Math.abs(s.h) > Math.abs(s.w)) {
							s.w = s.h;
						}
					}
	
					if (className == "north" || className == "south") {
						s.x = -1*s.h/2;
						s.w = s.h;
					}
	
					if (className == "east" || className == "west") {
						s.y = -1*s.w/2;
						s.h = s.w;
					}
	
					if (elCrd.w != elCrd.h) {
						elCrd.w = elCrd.h;
					}
					if (elCrd.h != elCrd.w) {
						elCrd.h = elCrd.w;
					}
	
				}
	
				return s;
			}
			for (let key in rzr_dirct) { 
				//here the script looks for names like "sw","se"...
				if (currentResizer.classList.contains(key)) {
					//ictn = instruction;
					let ictn = rzr_dirct[key];
					let speed = set_spd(ictn[0],ictn[1],ictn[2],ictn[3]);
					return speed;
				}
			}
		}
			
		let new_speed = set_dctn(speed);
	
		// console.log(speed,new_speed)
	
		//COLITION FOR RESIZER, NOT FOR ELEMENT
		let inpSpeed = {
			w:new_speed.w,
			h:new_speed.h,
			x:new_speed.x,
			y:new_speed.y
		}
	if (par instanceof Element) {
		if (elCrd.w == par.clientWidth) {elCrd.w-= 10};
		if (elCrd.h == par.clientWidth) {elCrd.h-= 10};
		//PARENT COLISION
		new_par_speed ={x:inpSpeed.x, y:inpSpeed.y};
		new_par_speedS = internalColision (el,par,e,new_speed.w,new_speed.h);
		new_par_speed = internalColision (el,par,e,new_speed.x,new_speed.y);

		if (notSquare === undefined || notSquare == 0 || notSquare == "") {
			if (new_par_speed.colision.top || new_par_speed.mouseOut.top) {
				new_par_speed.x = new_par_speed.y;
				new_par_speedS.x = 0;
			}
			if (new_par_speedS.colision.left || new_par_speedS.mouseOut.left) {
				new_par_speed.y = new_par_speed.x;
				new_par_speedS.y = 0;
			}

			if (new_par_speedS.colision.right || new_par_speedS.mouseOut.right) {
				new_par_speedS.y = new_par_speedS.x;
				new_par_speed.y = 0;
			}
			if (new_par_speedS.colision.bottom || new_par_speedS.mouseOut.bottom) {
				new_par_speedS.x = new_par_speedS.y;
				new_par_speed.x = 0;
			}
		}
		inpSpeed.x = new_par_speed.x;
		inpSpeed.y = new_par_speed.y;	
		inpSpeed.w = new_par_speedS.x;
		inpSpeed.h = new_par_speedS.y;
		
	}
	
		elCrd.w += inpSpeed.w;
		elCrd.h += inpSpeed.h;
		elCrd.x += inpSpeed.x;
		elCrd.y += inpSpeed.y;
		
		
		el.style.width = elCrd.w + "px";
		el.style.height = elCrd.h + "px";
	
		el.style.left = elCrd.x + "px";
		el.style.top = elCrd.y + "px";
	
		speed.x = e.x;
		speed.y = e.y;
		
	}
	
		function mUp_Rz (e) {
			window.removeEventListener("mousemove", mMove_Rz);
			window.removeEventListener("mouseup", mUp_Rz);
			el.isResizing = false;
		}
	
	}
	
	//END OF RESZIEEL
	}
	//END OF RESZIEEL
	
	
	
	
	
	
	//source https://learn.javascript.ru/coordinates-document
	
	// function getCoords(elem) { // кроме IE8-
	//   var box = elem.getBoundingClientRect();
	
	//   return {
	//     top: box.top + pageYOffset,
	//     left: box.left + pageXOffset
	//   };
	
	// }
	
	//cross-browser option
	function getCoords(elem) {
	  // (1)
	  var box = elem.getBoundingClientRect();
	
	  var body = document.body;
	  var docEl = document.documentElement;
	
	  // (2)
	  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
	
	  // (3)
	  var clientTop = docEl.clientTop || body.clientTop || 0;
	  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
	
	  // (4)
	  var top = box.top + scrollTop - clientTop;
	  var left = box.left + scrollLeft - clientLeft;
	
	  return {
		top: top,
		left: left
	  };
	}
	
	//sourseEnd