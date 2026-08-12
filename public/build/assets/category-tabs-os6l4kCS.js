import{j as e}from"./app-B2rgZD08.js";import{L as l}from"./layout-grid-Dmjbddzn.js";import{B as i}from"./building-2-BInPsZ3W.js";import{S as s}from"./star-lR7e_ZqN.js";import{c as o}from"./createLucideIcon-BouSKpSj.js";import{U as c}from"./users-k9o25CIC.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]],m=o("Crown",d);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",key:"1f1r0c"}]],b=o("Diamond",p);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M6 3h12l4 6-10 13L2 9Z",key:"1pcd5k"}],["path",{d:"M11 3 8 9l4 13 4-13-3-6",key:"1fcu3u"}],["path",{d:"M2 9h20",key:"16fsjt"}]],f=o("Gem",u),h="All",y=[{label:h,icon:l},{label:"Economy",icon:i},{label:"Standard",icon:s},{label:"Premium",icon:m},{label:"VIP",icon:b},{label:"Family",icon:c},{label:"Group Hotels",icon:f}];function w({active:t,onChange:r}){return e.jsx("div",{"data-aos":"fade-up",className:"flex flex-wrap justify-center gap-3",children:y.map(a=>{const n=t===a.label;return e.jsxs("button",{type:"button",onClick:()=>r(a.label),className:`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition duration-200 ${n?"bg-brand-navy border-brand-navy text-white":"border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"}`,children:[e.jsx(a.icon,{className:"h-4 w-4"}),a.label]},a.label)})})}export{h as ALL_CATEGORY,y as categories,w as default};
