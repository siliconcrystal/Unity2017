var lectures = [
	{ title: "Week 1 Morning: Introduction to Unity & C#", img: "./art/week1_1.png", slideshow: "./file/Unity_week1_20171118_1.pdf", video: "" },
    { title: "Week 1 Afternoon: UI & Framwork & IO of Unity", img: "./art/week1_2.jpg", slideshow: "https://drive.google.com/drive/folders/1t8DBTIkhPngyvW-4E8aauTdjE93i-Dkp?usp=sharing", video: "https://youtu.be/P3cT9mnVmw0" }
]

var Lecture = React.createClass({
	render: function () {
		var slideshowTemp;
		var videoTemp;
		var buttonCount = 0;
		if (this.props.slideshow != undefined) {
			buttonCount++;
		}
		if (this.props.video != undefined) {
			buttonCount++;
		}
		var buttonEle = [];
		if (this.props.slideshow != undefined) {
			buttonEle.push(React.createElement("a", { className: "slideshowB buttonCount" + buttonCount, href: this.props.slideshow, target: "_blank" }));
		}
		if (this.props.video != undefined) {
			buttonEle.push(React.createElement("a", { className: "videoB buttonCount" + buttonCount, href: this.props.video, target: "_blank" }));
		}
		return React.createElement(
			"div",
			{ className: "lecture" },
			React.createElement(
				"div",
				{ style: { "background-image": "url(" + this.props.img + ")" }, className: "lectureImg" }
			),
			React.createElement(
				"div",
				{ className: "lectureTitle" },
				this.props.title
			),
			React.createElement(
				"div",
				{ className: "cardButton" },
				buttonEle
			)
		);
	}
});

var Main = React.createClass({
	render: function () {
		var lecturesEle = [];
		for (var a in lectures) {
			lecturesEle.push(React.createElement(Lecture, { title: lectures[a].title, img: lectures[a].img, slideshow: lectures[a].slideshow, video: lectures[a].video }));
		}
		return React.createElement(
			"div",
			null,
			React.createElement(
				"header",
				null,
				React.createElement(Navigator, null)
			),
			React.createElement(
				"div",
				{ id: "lectureBody" },
				lecturesEle
			),
			React.createElement(
				Footer,
				null
			)
		)
	}
});
currentPage.lecture = "currentPage";
ReactDOM.render(React.createElement(Main, null), document.getElementById("main"));