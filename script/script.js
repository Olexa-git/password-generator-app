let uppercase = false;
let lowercase = false;
let numbers = false;
let symbols = false;
let char_length = 6;
const uppercase_checkbox = document.getElementById("upper_checkbox");
const lower_checkbox = document.getElementById("lower_checkbox");
const number_checkbox = document.getElementById("number_checkbox");
const symbol_checkbox = document.getElementById("symbol_checkbox");
const slider_ball = document.getElementById("slider_ball");
const slider = document.getElementById("slider");
const char_number_sign = document.getElementById("char_number_sign");
const strength_rate = document.getElementById("strength_rate");
const strength_scale = document.querySelectorAll('.strength_indicator_box');
const copy_btn = document.getElementById("copy_btn");
const copied = document.getElementById("copied");
const	generate_btn = document.getElementById("generate_btn");
let password = document.getElementById("password");

uppercase_checkbox.addEventListener("click", () => {
	checkbox_marking(uppercase_checkbox);
	uppercase = !uppercase;
	password_strength ();
});
lower_checkbox.addEventListener("click", () => {
	checkbox_marking(lower_checkbox);
	lowercase = !lowercase;
	password_strength ();
});
number_checkbox.addEventListener("click", () => {
	checkbox_marking(number_checkbox);
	numbers = !numbers;
	password_strength ();
});
symbol_checkbox.addEventListener("click", () => {
	checkbox_marking(symbol_checkbox);
	symbols = !symbols;
	password_strength ();
});

copy_btn.addEventListener("click", () => {
  let password = document.getElementById("password").innerHTML;
  navigator.clipboard.writeText(password); // Copy the text inside the text field
  if (password == "PA$$W0rD:)!") {
  	alert("Please generate a password")
  } else {
  copied.classList.remove("invisible");
  }
});

generate_btn.addEventListener("click", () => {
	const generate = generateP (char_length, uppercase, lowercase, numbers, symbols);
	password.innerHTML = generate;
	password.style.opacity = "1";
})


function checkbox_marking (checkbox) {
	checkbox.classList.toggle("checkbox_checked");
	checkbox.classList.toggle("checkbox_empty");
}

function password_strength () {
	const strength_param = [uppercase, lowercase, numbers, symbols];
	let strength = 0;
	strength_param.forEach((param) => {
		if (param) {
			strength+=1
		}
	});
	if (strength == 0) {
		for (let i = 1; i <= 4; i++) {
			strength_scale[i-1].className="";
			strength_scale[i-1].classList.add("strength_indicator_box_pasive");
		}
		strength_rate.innerHTML = "";
	} else if (strength == 1) {
		strength_scale[0].className="strength_indicator_box red";
		strength_scale[1].className="strength_indicator_box_pasive";
		strength_scale[2].className="strength_indicator_box_pasive";
		strength_scale[3].className="strength_indicator_box_pasive";
		strength_rate.innerHTML = 'TOO WEAK!';
	} else if (strength == 2) {
		strength_scale[0].className="strength_indicator_box orange";
		strength_scale[1].className="strength_indicator_box orange";
		strength_scale[2].className="strength_indicator_box_pasive";
		strength_scale[3].className="strength_indicator_box_pasive";
		strength_rate.innerHTML = 'WEAK';
	} else if (strength == 3) {
		strength_scale[0].className="strength_indicator_box yellow";
		strength_scale[1].className="strength_indicator_box yellow";
		strength_scale[2].className="strength_indicator_box yellow";
		strength_scale[3].className="strength_indicator_box_pasive";
		strength_rate.innerHTML = 'MEDIUM';
	} else if (strength == 4) {
		strength_scale[0].className="strength_indicator_box green";
		strength_scale[1].className="strength_indicator_box green";
		strength_scale[2].className="strength_indicator_box green";
		strength_scale[3].className="strength_indicator_box green";
		strength_rate.innerHTML = 'STRONG';
	}
}
password_strength ();

slider_ball.onmousedown = function(event) {
  event.preventDefault(); // prevent selection start (browser action)
  let shiftX = event.clientX - slider_ball.getBoundingClientRect().left;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  function onMouseMove(event) {
  	let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
    if (newLeft < 119) {
      newLeft = 119;
    }
    let rightEdge = slider.offsetWidth - slider_ball.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    for (let i = 0; i<=19; i++) {
    	if (newLeft >= i*23.8-11.9 && newLeft <= (i+1)*23.8-11.9) {
    	char_length = i+1;
		}
	};	
    slider_ball.style.left = newLeft + 'px';
  }
  function onMouseUp() {
  	slider_ball.style.left = char_length*23.8-24.8 + 'px';	
  	document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
    char_amount()
  }
};
slider_ball.ondragstart = function() {
  return false;
};

slider_ball.addEventListener("touchstart", function(event) {
  event.preventDefault();
  let shiftX = event.touches[0].clientX - slider_ball.getBoundingClientRect().left;
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchUp);
  function onTouchMove(event) {
    let newLeft = event.touches[0].clientX - shiftX - slider.getBoundingClientRect().left;
    if (screen.width > 375) {
    	if (newLeft < 119) {
      newLeft = 119;
    }
    let rightEdge = slider.offsetWidth - slider_ball.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    for (let i = 0; i<=19; i++) {
    	if (newLeft >= i*23.8-11.9 && newLeft <= (i+1)*23.8-11.9) {
    	char_length = i+1;
		}
    }
    } else {
	    if (newLeft < 65) {
	      newLeft = 65;
	    }
	    let rightEdge = slider.offsetWidth - slider_ball.offsetWidth;
	    if (newLeft > rightEdge) {
	      newLeft = rightEdge;
	    }
	    for (let i = 0; i<=19; i++) {
	    	if (newLeft >= i*15.6-28 && newLeft <= (i+1)*15.6-28) {
	    	char_length = i+1;
			}
    }

	}
    slider_ball.style.left = newLeft + 'px';
  }
  function onTouchUp() {
  	if (screen.width > 375) {
  		slider_ball.style.left = char_length*23.8-24.8 + 'px';
  	} else {
	  	slider_ball.style.left = char_length*15.6-26.0 + 'px';
  	}
  	document.removeEventListener('touchend', onTouchUp);
    document.removeEventListener('touchmove', onTouchMove);
    char_amount()
  }
});

function char_amount() {
	char_number_sign.innerHTML = `${char_length}`
	if (char_length == 1) {
		slider.style.background = "#18171F";
	} else if (char_length > 1 && char_length <= 10) {
		slider.style.background = `linear-gradient(to left, #18171F ${5*(20-char_length)}%, #A4FFAF ${5*char_length}%)`;
	} else {
		slider.style.background = `linear-gradient(to right, #A4FFAF ${5*char_length}%, #18171F ${5*(20-char_length)}%)`;
	}
}

function generateP(pass_length, Upp, Low, Num, Sym) {
  let pass = '';
  let str = '';
  if (Upp) {
  	str = str+'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (Low) {
  	str = str+'abcdefghijklmnopqrstuvwxyz';
  }
  if (Num) {
  	str = str + '0123456789';
  }
  if (Sym) {
  	str = str + '@#$%^&*';
  }
  if (str == "") {
  	alert("Please select at least one of options: Uppercase, Lowercase, Numbers, Symbols")
  }
  for (let i = 1; i <= pass_length; i++) {
      let char = Math.floor(Math.random()
                  * str.length);
      pass += str.charAt(char)
  }
  return pass;
}

function copy_to_clipboard () {
  password.select();
  password.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard.writeText(password.innerHTML); // Copy the text inside the text field
}