import{j as a}from"./app-BC9vGkvE.js";import{L as c}from"./layout-grid-RbY9nHrH.js";import{c as t}from"./createLucideIcon-L5c13qBr.js";import{P as l}from"./plane-takeoff-DlbKaMrS.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=[["path",{d:"M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"1l48ns"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"M15 15h.01",key:"lqbp3k"}]],i=t("TicketPercent",s);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],p=t("Trophy",d),h="All Packages",b=[{label:h,icon:c},{label:"Economy",icon:i},{label:"Premium",icon:p},{label:"Ticket Included",icon:l}];function f({active:o,onChange:n}){return a.jsx("div",{"data-aos":"fade-up",className:"flex flex-wrap justify-center gap-3",children:b.map(e=>{const r=o===e.label;return a.jsxs("button",{type:"button",onClick:()=>n(e.label),className:`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition duration-200 ${r?"bg-brand-navy border-brand-navy text-white":"border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"}`,children:[a.jsx(e.icon,{className:"h-4 w-4"}),e.label]},e.label)})})}export{h as ALL_CATEGORY,b as categories,f as default};
