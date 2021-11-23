import stache from "can-stache";

const template = /*stache*/`<h1>Hello {{message}}</h1>`;
window.TEMPLATE = template;
const view = stache(window.TEMPLATE);
document.querySelector('#test').appendChild(view({message: "inline"}));


const view2 = stache('<h1>Hey {{message}}</h1>');
document.querySelector('#test').appendChild(view2({message: "stache call expression"}));
