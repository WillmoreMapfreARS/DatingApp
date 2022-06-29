import { Component } from '@angular/core';
import { DateserviceService } from './services/dateservice.service';
import { User } from './models/User';
import { DatingAppService } from './services/dating-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DatingApp';
 
   visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
 amex = new RegExp("^3[47][0-9]{13}$");
 mastercard = new RegExp("^5[1-5][0-9]{14}$");
 tipoTarjeta="";
  constructor( private servicio:DatingAppService ){

    
    this.setCurrentUser();
  }
setCurrentUser()
{
  var datos:any =localStorage.getItem('user');
 const  user :User = JSON.parse(datos);
 this.servicio.setCurrentUser(user);
 
}

   IsNumeric(e:any) {
    var specialKeys = new Array();
        specialKeys.push(8);
        specialKeys.push(9);
        specialKeys.push(46);
        specialKeys.push(36);
        specialKeys.push(35); 
        specialKeys.push(37);
        specialKeys.push(39);
    if (e.keyCode === 46 && e.target.value.split('.').length === 2) {
        return false;
    }
    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    return ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90)
        || keyCode == 32 || keyCode == 44 || keyCode == 46
        || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
}
  setValor(valor :any)
  {
    var result= valor.value.replace(",","");
    console.log(result);
  }
  getCardType(cur_val :any) {
    // the regular expressions check for possible matches as you type, hence the OR operators based on the number of chars
    // regexp string length {0} provided for soonest detection of beginning of the card numbers this way it could be used for BIN CODE detection also
    
    cur_val= cur_val.target.value;
    console.log(cur_val);
    var sel_brand = "unknown";


    if (!cur_val.length) {
      return sel_brand;
  }
  // Remove all whitespaces from card number.
  cur_val = cur_val.replace(/\s/g, '');

  // 1. Remove last digit;
  const lastDigit = Number(cur_val[cur_val.length - 1]);

  // 2. Reverse card number
  const reverseCardNumber = cur_val.slice(0, cur_val.length - 1).split('').reverse().map( (x:any) => Number(x));
  let sum = 0;

  // 3. + 4. Multiply by 2 every digit on odd position. Subtract 9 if digit > 9
  for (let i = 0; i <= reverseCardNumber.length - 1; i += 2) {
      reverseCardNumber[i] = reverseCardNumber[i] * 2;
      if (reverseCardNumber[i] > 9) {
          reverseCardNumber[i] = reverseCardNumber[i] - 9;
      }
  }

  // 5. Make the sum of obtained values from step 4.
  sum = reverseCardNumber.reduce((acc :any, currValue:any) => (acc + currValue), 0);

  // 6. Calculate modulo 10 of the sum from step 5. and the last digit. If it's 0, you have a valid card number :)
 var resultado= (sum + lastDigit) % 10 === 0
  //return ((sum + lastDigit) % 10 === 0);
  if(resultado==false)
  {
    return sel_brand;
  }



    if(cur_val != null && cur_val != undefined && cur_val != ""){
      //JCB
      var jcb_regex = new RegExp("^(?:2131|1800|35)[0-9]{0,}$"); //2131, 1800, 35 (3528-3589)
      // American Express
      var amex_regex = new RegExp("^3[47][0-9]{0,}$"); //34, 37
      // Diners Club
      var diners_regex = new RegExp("^3(?:0[0-59]{1}|[689])[0-9]{0,}$"); //300-305, 309, 36, 38-39
      // Visa
      var visa_regex = new RegExp("^4[0-9]{0,}$"); //4
      // MasterCard
      var mastercard_regex = new RegExp(
        "^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$"
      ); //2221-2720, 51-55
      var maestro_regex = new RegExp("^(5[06789]|6)[0-9]{0,}$"); //always growing in the range: 60-69, started with / not something else, but starting 5 must be encoded as mastercard anyway
      //Discover
      var discover_regex = new RegExp(
        "^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$"
      );
      ////6011, 622126-622925, 644-649, 65

      // get rid of anything but numbers
      cur_val = cur_val.replace(/\D/g, "");

      // checks per each, as their could be multiple hits
      //fix: ordering matter in detection, otherwise can give false results in rare cases
     
      if (cur_val.match(jcb_regex)) {
        sel_brand = "JCB";
      } else if (cur_val.match(amex_regex)) {
        sel_brand = "Amex";
      } else if (cur_val.match(diners_regex)) {
        sel_brand = "Diners_club";
      } else if (cur_val.match(visa_regex)) {
        sel_brand = "Visa";
      } else if (cur_val.match(mastercard_regex)) {
        sel_brand = "Mastercard";
      } else if (cur_val.match(discover_regex)) {
        sel_brand = "Discover";
      } else if (cur_val.match(maestro_regex)) {
        if (cur_val[0] == "5") {
          //started 5 must be mastercard
          sel_brand = "MasterCard";
        } else {
          sel_brand = "Maestro"; //maestro is all 60-69 which is not something else, thats why this condition in the end
        }
      }

    }
    console.log(sel_brand);
      return sel_brand;
  }

 
}
