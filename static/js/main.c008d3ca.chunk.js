(this["webpackJsonptodo-react"]=this["webpackJsonptodo-react"]||[]).push([[0],{21:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var o,r,a,d=n(0),c=n.n(d),i=n(9),l=n.n(i),s=(n(21),n(3)),u=n(8),g=n(5),b=n(15),h=n(4),p=n(6),m=n(13),j=n(14),f=n(1),O=new(function(){function e(){var t=this;Object(m.a)(this,e),this.todos=[],Object(f.g)(this,{todos:f.h,completedTodosCount:f.d,incompletedTodosCount:f.d,loadTodos:f.b,addTodo:f.b,deleteTodoAt:f.b}),Object(f.c)((function(){return console.info(t.report)})),this.loadTodos(),Object(f.c)((function(){return t.saveTodos()}))}return Object(j.a)(e,[{key:"completedTodosCount",get:function(){return this.todos.filter((function(e){return!0===e.completed})).length}},{key:"incompletedTodosCount",get:function(){return this.todos.filter((function(e){return!1===e.completed}))}},{key:"report",get:function(){if(0===this.todos.length)return"<none>";var e=this.todos.find((function(e){return!1===e.completed}));return'Next todo: "'.concat(e?e.text:"<none>",'". ')+"Progress: ".concat(this.completedTodosCount,"/").concat(this.todos.length,"}")}},{key:"addTodo",value:function(e){this.todos.push({text:e,completed:!1,completedAt:null,createdAt:Date.now(),updatedAt:Date.now(),assignee:null})}},{key:"loadTodos",value:function(){var e=window.localStorage.getItem("tododata");if(e){var t=JSON.parse(e).todos;this.todos=t}}},{key:"deleteTodoAt",value:function(e){var t=this.todos,n=Object(u.a)(t);n.splice(e,1),this.setTodos(n)}},{key:"saveTodos",value:function(){var e=this.todos;window.localStorage.setItem("tododata",JSON.stringify({todos:e}))}},{key:"setTodos",value:function(e){this.todos=e}}]),e}()),x=n(2),v=Object(p.a)((function(e){var t=e.className,n=e.index,o=e.todo,r=e.handleDragStart,a=e.handleDragOver,d=e.handleDrop,c=o.completed,i=o.text,l="todoItem".concat(n),s="".concat(n),u=c?"disabled":"";return Object(x.jsx)("li",{className:"".concat(t," ").concat(u),draggable:!0,"data-position":n,onDragStart:r,onDragOver:a,onDrop:d,children:Object(x.jsxs)("label",{children:[Object(x.jsx)("span",{className:"dragIcon",children:"\u2254"}),Object(x.jsx)("input",{type:"checkbox",id:l,checked:c,onChange:function(){o.completed=!o.completed}}),Object(x.jsx)("span",{className:"todoText",children:i}),Object(x.jsx)("button",{type:"button",className:"delete",onClick:function(e){e.preventDefault(),O.deleteTodoAt(n)},children:"x"})]})},s)})),T=Object(h.a)(v)(o||(o=Object(s.a)(['\n  label {\n    border: 1px solid #61dafb;\n    padding: 1em;\n    margin: 0 0 1em;\n    width: 15em;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n\n    :hover {\n      background: #c5ffff;\n      cursor: pointer;\n      color: #3c4048;\n    }\n\n    span.todoText {\n      flex-grow: 2;\n    }\n  }\n\n  input[type="checkbox"] {\n    margin-right: 1em;\n    min-width: 2em;\n    min-height: 2em;\n  }\n\n  &.disabled {\n    label {\n      color: grey;\n      border: 1px solid grey;\n\n      :hover {\n        background: #464a52;\n        cursor: pointer;\n      }\n    }\n\n    input[type="checkbox"] {\n      border: 1px solid grey;\n      opacity: 0.5;\n    }\n  }\n\n  .delete {\n    opacity: 0.75;\n    background-color: darkred;\n    border: 1px solid red;\n    border-radius: 2px;\n    height: 2em;\n    width: 2em;\n    color: white;\n    text-align: center;\n  }\n\n  .dragIcon {\n    cursor: grab;\n  }\n']))),y=Object(p.a)((function(e){var t=e.className,n=e.handleDragStart,o=e.handleDragOver,r=e.handleDrop,a=O.todos.map((function(e,t){var a="".concat(t);return Object(x.jsx)(T,{index:t,todo:e,handleDragStart:n,handleDragOver:o,handleDrop:r},a)})),d=Object(x.jsx)("li",{children:Object(x.jsx)("p",{children:"Try adding a Todo above!"})});return Object(x.jsx)("ul",{className:t,children:a.length>0?a:d})})),D=Object(h.a)(y)(r||(r=Object(s.a)(["\n  li {\n    /* Specify this style here so the empty state will get it too. */\n    list-style: none;\n  }\n"])));var k,w=Object(h.a)((function(e){var t=e.className;return Object(x.jsx)("div",{className:t,children:Object(x.jsx)("input",{type:"text",id:"addTodo",placeholder:"Add a Todo"})})}))(a||(a=Object(s.a)(['\n  input[type="text"] {\n    border: 1px solid #61dafb;\n    border-radius: 0.5em;\n    padding: 1em;\n    margin: 0 0 1em;\n    display: block;\n    width: 50em;\n    color: white;\n    background: #3c4048;\n  }\n\n  input::placeholder {\n    color: #118aab;\n  }\n']))),N={draggedFrom:null,draggedTo:null,isDragging:!1,originalOrder:[],updatedOrder:[]},S=Object(p.a)((function(e){var t=e.className,n=O.todos,o=Object(d.useState)(N),r=Object(b.a)(o,2),a=r[0],c=r[1];return Object(x.jsx)("div",{className:t,children:Object(x.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=document.getElementById("addTodo"),n=t.value;O.addTodo(n),t.value=""},children:[Object(x.jsx)(w,{}),Object(x.jsx)("hr",{}),Object(x.jsx)(D,{todoStore:O,handleDragStart:function(e){var t=Number(e.currentTarget.dataset.position);c(Object(g.a)(Object(g.a)({},a),{},{draggedFrom:t,isDragging:!0,originalOrder:n})),e.dataTransfer.setData("text/html","")},handleDragOver:function(e){e.preventDefault();var t=a.originalOrder,n=a.draggedFrom,o=Number(e.currentTarget.dataset.position),r=t[n],d=t.filter((function(e,t){return t!==n}));t=[].concat(Object(u.a)(d.slice(0,o)),[r],Object(u.a)(d.slice(o))),o!==a.draggedTo&&c(Object(g.a)(Object(g.a)({},a),{},{updatedOrder:t,draggedTo:o}))},handleDrop:function(){O.setTodos(a.updatedOrder),c(Object(g.a)(Object(g.a)({},a),{},{draggedFrom:null,draggedTo:null,isDragging:!1}))}})]})})})),A=Object(h.a)(S)(k||(k=Object(s.a)(["\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n\n  form {\n    padding-top: 1em;\n  }\n\n  hr {\n    border: 1px solid #61dafb;\n    margin: 2em 0;\n  }\n\n  ul {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n"])));l.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(A,{})}),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.c008d3ca.chunk.js.map