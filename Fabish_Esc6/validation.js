//incorrect
const form = document.getElementById('form');
const firstname_input=document.getElementById('firstname-input');
const email_input=document.getElementById('email-input');
const pass_input=document.getElementById('password-input');
const conf_pass_input=document.getElementById('confirm-password-input');
const error_massage=document.getElementById('error-message');
const success_message = document.getElementById("success-message");
const namergx=/^[a-zA-Z\u0600-\u06FF\s]+$/;
const emailrgx=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordrgx=/^[A-Za-z\d!@#$%^&*()-_=+]{8,}$/;


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let errors=[];

    if (firstname_input) {
        errors=getRegisterError(firstname_input.value, email_input.value,pass_input.value,conf_pass_input.value);
        if(errors.length===0) 
         {
            if (isEmailRegister(email_input.value)) {
               
                    error_massage.innerText = "This email is already registered. Please Try Another account or login";
                    return;  
            }

            //save data local storage 
            saveUser(firstname_input.value,email_input.value,pass_input.value);
            alert("account save Done , Now can Login");
            window.location.href="login.html";
         }
            
        }
    

    else {
        errors=getLoginError(email_input.value,pass_input.value);
        if(errors.length===0){
            if(validateLogin(email_input.value,pass_input.value)){
                let users=getUser();
                let user=users.find(user=>user.email===email_input.value)
                  if (user) {
localStorage.setItem('loggedInUser',user.name);


                    
                  }
                success_message.innerText="Login Successfull";
                
                  setTimeout(()=>{
                    window.location.href="index.html";
                  },2000);

            }
            else{
                errors.push("Email Or Password Not Correct Please Try Again");
    document.getElementById("error-message").textContent="plese enter email and passwd"

            }

        }
    }

    if (errors.length>0) {
       
        error_massage.innerText = errors.join(". ");
    }



     
});

function getRegisterError(firstname,email,password,confirmpassword) {
    let errors =[];
    

    // if(firstname === ''|| firstname == null){
    //         errors.push('first name is requierd');
    //         firstname_input.parentElement.classList.add('incorrect')
    // }
    if(firstname.trim().length<3|| !namergx.test(firstname)){
        errors.push("Not Name ,Must be Not less than 3 and Not number or symbols");
        firstname_input.parentElement.classList.add("incorrect");
        
    }
    // if(email === ''|| email == null){
    //     errors.push('email is requierd');
    //     email_input.parentElement.classList.add('incorrect');
    //         }

    if(!email.trim() || !emailrgx.test(email)){
                errors.push('email  Not valid');
                email_input.parentElement.classList.add('incorrect');
                    }

    // if(password === ''|| password==null){
    //             errors.push('password is requierd');
    //             pass_input.parentElement.classList.add('incorrect');
    //                 }
    if(!password.trim()||!passwordrgx.test(password)){
                        errors.push('Password must be at least 8 characters and can contain letters, numbers, and symbols');
                        pass_input.parentElement.classList.add('incorrect');
                            }
  
    if(password !== confirmpassword)
    {
        errors.push('confirmpassword not same password');
        pass_input.parentElement.classList.add('incorrect');
        conf_pass_input.parentElement.classList.add('incorrect');

    }

return errors;
    
}

function getLoginError(email,password) {
    let errors =[];

    if( !email.trim()  || !emailrgx.test(email)){
        errors.push('Email not valid');
        email_input.parentElement.classList.add('incorrect');
            }

    if(!password.trim() ){
                errors.push('password is requierd , must be login same password');
                pass_input.parentElement.classList.add('incorrect');
                    }
   
  

return errors;
    
}
// if email alredy register
function getUser() {
    
let users = localStorage.getItem("users");
return users ? JSON.parse(users)  : [];

}

function isEmailRegister(email) {
const users = getUser();
    return  users.some(user=> user.email === email);

}

// save data in local storage 
function saveUser(name, email ,password) {
let users = getUser();
if (!Array.isArray(users)){
    users=[];
}

    users.push({name,email,password});
    
    localStorage.setItem("users",JSON.stringify(users));
    
}

//login check your data 
function validateLogin(email,password) {
    const users=getUser();
    return users.some( user=>user.email=== email && user.password ===password );
      
}

email_input.addEventListener('input' ,()=>{
    if (!emailrgx.test(email_input.value.trim())) {
        email_input.parentElement.classList.add('incorrect');
        error_massage.innerText = 'Email not valid';
    } else {
        email_input.parentElement.classList.remove('incorrect');
        error_massage.innerText = '';
    }
});

const allinput=[firstname_input,email_input,pass_input,conf_pass_input].filter(input => input !== null);
allinput.forEach(input=>{
    input.addEventListener('input',()=>
        {
        if (input.parentElement.classList.contains('incorrect')) 
            {
            input.parentElement.classList.remove('incorrect');
            error_massage.innerText='';
        }
    });
});
