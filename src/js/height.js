export default function(){
  let clientHeight = 0;
  // console.log(
  //   document.body.clientHeight,document.documentElement.clientHeight
  // );
  
  if ( document.body.clientHeight&& document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
}

// import getClientHeight from "@/js/height.js";
// let width = (height()).toString() + "px";
// document.getElementById("c-height").style.height = width;

