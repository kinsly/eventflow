import{j as e,W as f,r as g,Y as h,a as i}from"./app-nNOKH99h.js";import{G as j}from"./GuestLayout-MX4valmk.js";import{I as l}from"./InputError-CvwNwlWB.js";import{I as n}from"./InputLabel-pmu_96lA.js";import{P as b}from"./PrimaryButton-C2L31jkb.js";import{T as d}from"./TextInput-BeOhOwRp.js";import"./BackBtn-C3HNZR8l.js";function w({className:r="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+r})}function F({status:r,canResetPassword:a}){const{data:t,setData:m,post:c,processing:u,errors:o,reset:x}=f({email:"",password:"",remember:!1});g.useEffect(()=>()=>{x("password")},[]);const p=s=>{s.preventDefault(),c(route("login"))};return e.jsxs(j,{backBtnAction:"",children:[e.jsx(h,{title:"Log in"}),r&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:r}),e.jsx("div",{className:"",children:e.jsxs("form",{onSubmit:p,className:"",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"email",value:"Email"}),e.jsx(d,{id:"email",type:"email",name:"email",value:t.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:s=>m("email",s.target.value),"data-cy":"email"}),e.jsx(l,{message:o.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(n,{htmlFor:"password",value:"Password"}),e.jsx(d,{id:"password",type:"password",name:"password",value:t.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:s=>m("password",s.target.value),"data-cy":"password"}),e.jsx(l,{message:o.password,className:"mt-2"})]}),e.jsx("div",{className:"block mt-4",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(w,{name:"remember",checked:t.remember,onChange:s=>m("remember",s.target.checked)}),e.jsx("span",{className:"ms-2 text-sm text-gray-600",children:"Remember me"})]})}),e.jsxs("div",{className:"md:flex lg:flex items-center justify-between mt-4",children:[e.jsx("div",{children:e.jsx(i,{href:route("register"),children:"Not Registered? "})}),a&&e.jsx(i,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e.jsx(b,{className:"ms-4",disabled:u,"data-cy":"submit",children:"Log in"})]})]})})]})}export{F as default};
