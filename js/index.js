var weekNum=1;
var courseTitle="Morning: Introduction to Unity & C# / Afternoon: UI & Framwork & IO of Unity";
var courseInfo=[
];
var announcement=[
	"第一週課程即將開始囉！", 
	"請各位同學務必攜帶自己的筆電並安裝好以下軟體（要下載很久所以請務必先安裝好）：",
	"　",
	"1. Unity 5.6 (https://unity3d.com/unity/whats-new/unity-5.6.0)",
	"注意，不要裝比5.6.0新的版本（例如：2017.2） 不然有些功能會不相容",
	"　",
	"2. QuickTime (https://support.apple.com/downloads/quicktime)",
	"　",
	"大家週六早上 9:00 資工系館65304 教室來學Unity！"
];
var title = [
	/*{id:"final", mainTitle:"Final Presentation", subTopic:"2016.06.28", img:"./art/final.png"},*/
	{id:"unity", mainTitle:"Unity ", subTopic:"2017", img:"./art/title_unity.png"}
]

var titleCount=title.length;
var currentTitle=0;
var changeTitle=true;
var TitleElement=React.createClass({
	render:function(){
		var iframe=null;
		if(this.props.content!=undefined){
			iframe=[
				React.createElement("iframe", {src:this.props.content, className:"titleIframe"}),
				React.createElement("div", {className:"titleIframeLink"})
				];
		}
		return React.createElement(	
			"a",
			{className:"titleBody", id:"title"+this.props.id, href:this.props.href, style:{"background-image":"url("+this.props.img+")"}},
			iframe,
			React.createElement(
				"div",
				{className:"titleName"},
				React.createElement(
					"div",
					{className:"mainTitle"},
					this.props.mainTitle
				),
				React.createElement(
					"div",
					{className:"subTopic"},
					this.props.subTopic
				)
				
			)
		);
	}
});

var TitleNavEle=React.createClass({
	clickEvent:function(){
		changeTitle=false;
		changeTitlePage(this.props.num);
	},
	render:function(){
		var className="titleNavEle";
		if(this.props.num==currentTitle){
			className="titleNavEle currentTitle";
		}
		return React.createElement(
			"div",
			{className:className, id:"titlePage"+this.props.num, onClick:this.clickEvent}
		);
	}
});

var Title=React.createClass({
	render:function(){
		var titleEle=[];
		for(var a in title){
			titleEle.push(React.createElement(TitleElement, {mainTitle:title[a].mainTitle, subTopic:title[a].subTopic, img:title[a].img, href:title[a].href, id:title[a].id, count:a, content:title[a].content}));
		}
		var titleNavEle=[];
		for(var a in title){
			titleNavEle.push(React.createElement(TitleNavEle, {num:a}));
		}
		return React.createElement(
			"div",
			{id:"title"},
			React.createElement(
				"div",
				{id:"innerTitle"},
				titleEle
			),
			React.createElement(
				"div",
				{id:"titleNav"},
				titleNavEle
			)
		);
	}
});

var Info=React.createClass({
	render:function(){
		var courseInfoEle=[];
		for(var a in courseInfo){
			courseInfoEle.push(React.createElement("div", null, courseInfo[a]));
		}
		var announcementEle=[];
		for(var a in announcement){
			announcementEle.push(React.createElement("div", null, announcement[a]));
		}
		return React.createElement(
			"div",
			{id:"infoBody"},
			React.createElement(
				"div",
				{id:"nextLecture", className:"infoEle"},
				React.createElement(
					"div",
					{className:"week"},
					"Week "+weekNum
				),
				React.createElement(
					"div",
					{className:"courseTitle"},
					courseTitle
				),
				React.createElement(
					"div",
					{className:"courseInfo"},
					courseInfoEle
				)
			),
			React.createElement(
				"div",
				{id:"announcement", className:"infoEle"},
				React.createElement(
					"div",
					{id:"annTitle"},
					"Announcement"
				),
				React.createElement(
					"div",
					{className:"courseInfo"},
					announcementEle
				)
			)
		);
	}
});



var Main = React.createClass({
	render: function() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"header",
				null,
				React.createElement(Navigator, null)
			),
			React.createElement(
				Title,
				null
			),
			React.createElement(
				Info,
				null
			),
			React.createElement(
				Footer,
				null
			)
		)
	}
});
function changeTitlePage(num){
	num=parseInt(num);
	if(num>=titleCount){
		return false;
	}
	document.getElementById("titlePage"+currentTitle).className="titleNavEle";
	document.getElementById("titlePage"+num).className="titleNavEle currentTitle";
	document.getElementById("innerTitle").style.left=-screenWidth*num+"px"
	currentTitle=num;
}

function autoChangeTitle(){
	var nextTitle=currentTitle+1;
	if(nextTitle>=titleCount){
		nextTitle=0;
	}
	if(changeTitle==true){
		changeTitlePage(nextTitle);
	}else{
		changeTitle=true;
	}
}

var screenWidth=window.innerWidth||document.documentElement.clientWidth||d.getElementsByTagName('body')[0].clientWidth;
var addEvent = function(object, type, callback) {
	if (object == null || typeof(object) == 'undefined') return;
	if (object.addEventListener) {
		object.addEventListener(type, callback, false);
	} else if (object.attachEvent) {
	object.attachEvent("on" + type, callback);
	} else {
	object["on"+type] = callback;
	}
};

function resize(){
	var screenWidthT=window.innerWidth||document.documentElement.clientWidth||d.getElementsByTagName('body')[0].clientWidth;
	var screenHeightT=window.innerHeight||document.documentElement.clientHeight||d.getElementsByTagName('body')[0].clientHeight;
	if(screenWidthT < 320){
		screenWidth=320;
	}else{
		screenWidth=screenWidthT;
	}
	if (screenWidthT <= 480) {
		screenHeightT = 348;
	} else if (screenHeightT < 600) {
		screenHeightT = 600;
	}
	for (var a in title) {
		document.getElementById("title"+title[a].id).style.width=screenWidth+"px";
		document.getElementById("title").style.height=screenHeightT-48+"px";
	}
	changeTitlePage(currentTitle);
}

var interval=setInterval(autoChangeTitle, 5000);
currentPage.index="currentPage";
ReactDOM.render(React.createElement(Main, null), document.getElementById("main"));
resize();
addEvent(window, "resize", resize);