import{W as n,j as e,Y as d}from"./app-nNOKH99h.js";import{G as u}from"./GuestLayout-MX4valmk.js";import{I as c}from"./InputError-CvwNwlWB.js";import{P as p}from"./PrimaryButton-C2L31jkb.js";import{T as x}from"./TextInput-BeOhOwRp.js";import"./BackBtn-C3HNZR8l.js";function y({status:t}){const{data:a,setData:o,post:r,processing:m,errors:i}=n({email:""}),l=s=>{s.preventDefault(),r(route("password.email"))};return e.jsxs(u,{backBtnAction:"",children:[e.jsx(d,{title:"Forgot Password"}),e.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."}),t&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:t}),e.jsxs("form",{onSubmit:l,children:[e.jsx(x,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",isFocused:!0,onChange:s=>o("email",s.target.value)}),e.jsx(c,{message:i.email,className:"mt-2"}),e.jsx("div",{className:"flex items-center justify-end mt-4",children:e.jsx(p,{className:"ms-4",disabled:m,children:"Email Password Reset Link"})})]})]})}export{y as default};
