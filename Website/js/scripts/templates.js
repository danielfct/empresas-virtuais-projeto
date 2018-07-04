function makeSignPageEnterprise() {
    return ` <div><h4>Account Information</h4></div>  
    <br>
    <div class="row">
        <div class="input-field col m4">
            <i class="material-icons prefix">email</i>
            <input id="email" type="email" class="autocomplete validate"> 
            <label for="email">Email</label>               
        </div>
        <div class="input-field col m4">
            <i class="material-icons prefix">fingerprint</i>
            <input id="password" type="password" class="autocomplete validate">
            <label for="passowrd">Password</label>               
        </div>
    </div>
    <div>
        <div class="input-field col m8">
            <i class="material-icons prefix">account_circle</i>
            <input id="name" type="text" class="autocomplete validate">    
            <label for="name">Name</label>                    
        </div>
    </div>
    <div class="row">
        <div class="input-field col m8">
            <i class="material-icons prefix">phone</i>
            <input id="phoneNumber" type="number" class="autocomplete validate">
            <label for="phoneNumber">Phone number</label>               
        </div>
    </div>
    <div class="row">
        <div class="input-field col m4">
            <i class="material-icons prefix">location_on</i>
            <input id="country" type="text" class="autocomplete validate">
            <label for="country">Country</label>               
        </div>
        <div class="input-field col m4">
            <i class="material-icons prefix">location_city</i>
            <input id="city" type="text" class="autocomplete validate">
            <label for="city">City</label>               
        </div>
    </div>
    <div class="row">
        <div class="input-field col m4">
            <i class="material-icons prefix">my_location</i>
            <input id="location" type="text" class="autocomplete validate">
            <label for="location">Location</label>   
        </div>
        <div class="input-field col m4">
            <input id="range" type="number" class="autocomplete validate">
            <label for="range">Range of action (kilometers)</label>       
        </div>    
    </div>
    <div class="row">
        <div class="input-field col m6">
        <i class="material-icons prefix">image</i>
        <input type='file'  onchange="readURL(this);" />
        <img id="blah" />
        </div>          
    </div>
    <div class="row">
        <div class="input-field col m8">
            <i class="material-icons prefix">group</i>
            <input id="workersNumber" type="number" class="autocomplete validate">
            <label for="workersNumber">Number of workers</label>       
    </div>
    <div class="row">
        <div class="col m8">
            <span class="">What do you offer:</span>
            <p></p>
            <form>
                <label>
                    <input type="radio" id="Catering" name="group" class="with-gap gap">
                    <span>Catering</span>
                </label>
                <label>
                    <input type="radio" id="Segurança" name="group" class="with-gap gap">
                    <span>Segurança</span>
                </label>
                <label>
                    <input type="radio" id="Animaçao" name="group" class="with-gap gap">
                    <span>Animação</span>
                </label>
                <label>
                    <input type="radio" id="Limpeza" name="group" class="with-gap gap">
                    <span>Limpeza</span>
                </label>
                <label>
                    <input type="radio" id="Serviços" name="group" class="with-gap gap">
                    <span>Serviços Técnicos</span>
                </label>
            </form>    
        </div>  
        
    </div>
    <div class="row">
        <div class="col m2">
            <button id="register" class="btn blue lighten-2 modal-trigger" href="#modal1">Register</button>
        </div>
    </div>
</div>`;
}

function makeSignPageClient() {
    return `<div><h4>Account Information</h4></div>  
            <br>
            <div class="row">
                <div class="input-field col m6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="first_name" type="text" class="autocomplete validate">   
                    <label for="first_name">First name</label>                          
                </div>
                <div class="input-field col m6">
                    <input id="last_name" type="text" class="autocomplete validate"> 
                    <label for="last_name">Last name</label>                    
                </div>
            </div>    
            <div class="row">
                <div class="input-field col m6">
                    <i class="material-icons prefix">insert_emoticon</i>
                    <input id="username" type="text" class="autocomplete validate"> 
                    <label for="username">Username</label>
                </div>
            </div>
            <div class="row">   
                <div class="input-field col m6">
                    <i class="material-icons prefix">email</i>
                    <input id="email" type="email" class="autocomplete validate"> 
                    <label for="email">Email</label>
                </div>
            </div>
            <div class="row">   
                <div class="input-field col m6">
                    <i class="material-icons prefix">fingerprint</i>
                    <input id="password" type="password" class="autocomplete validate">
                    <label for="password">Password</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col m6">
                    <i class="material-icons prefix">phone</i>
                    <input id="PhoneNumber" type="number" class="autocomplete validate">
                    <label for="PhoneNumber">Phone number</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col m6">
                    <i class="material-icons prefix">phone</i>
                    <input id="MobileNumber" type="number" class="autocomplete validate">
                    <label for="MobileNumber">Mobile number</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col m6">
                    <i class="material-icons prefix">location_on</i>
                    <input id="Address" type="text" class="autocomplete validate">
                    <label for="Address">Address</label>
                </div>
            </div>        
            <div class="row">  
                <div class="col m2">
                    <button id="register" class="btn blue lighten-2 modal-trigger" href="#modal1">Register</button>
                </div>
            </div>`;
}

/*function mostrarMembros() {
    para cada membro:
    <div id="profile-page-header" class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="user-profile-bg.jpg" alt="user background">                    
                </div>
                <figure class="card-profile-image">
                    <img src="avatar.jpg" alt="profile image" class="circle z-depth-2 responsive-img activator">
                </figure>
                <div class="card-content">
                  <div class="row">                    
                    <div class="col s3 offset-s2">                        
                        <h4 class="card-title grey-text text-darken-4">Roger Waters</h4>
                        <p class="medium-small grey-text">Project Manager</p>                        
                    </div>
                    <div class="col s2 center-align">
                        <h4 class="card-title grey-text text-darken-4">10+</h4>
                        <p class="medium-small grey-text">Work Experience</p>                        
                    </div>
                    <div class="col s2 center-align">
                        <h4 class="card-title grey-text text-darken-4">6</h4>
                        <p class="medium-small grey-text">Completed Projects</p>                        
                    </div>                    
                    <div class="col s2 center-align">
                        <h4 class="card-title grey-text text-darken-4">$ 1,253,000</h4>
                        <p class="medium-small grey-text">Business Profit</p>                        
                    </div>                    
                    <div class="col s1 right-align">
                      <a class="btn-floating activator waves-effect waves-light darken-2 right">
                          <i class="mdi-action-perm-identity"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="card-reveal">
                    <p>
                      <span class="card-title grey-text text-darken-4">Roger Waters <i class="mdi-navigation-close right"></i></span>
                      <span><i class="mdi-action-perm-identity cyan-text text-darken-2"></i> Project Manager</span>
                    </p>

                    <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                    
                    <p><i class="mdi-action-perm-phone-msg cyan-text text-darken-2"></i> +1 (612) 222 8989</p>
                    <p><i class="mdi-communication-email cyan-text text-darken-2"></i> mail@domain.com</p>
                    <p><i class="mdi-social-cake cyan-text text-darken-2"></i> 18th June 1990</p>
                    <p><i class="mdi-device-airplanemode-on cyan-text text-darken-2"></i> BAR - AUS</p>
                </div>
            </div>
}*/