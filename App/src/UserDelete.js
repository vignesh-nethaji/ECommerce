import React, { useState } from 'react';
import axios from "axios";


const Delete = () => {
    axios.post("http://localhost:40073/api/User/Delete", {
        "id": 0,
        "email": emailidvld,
        "username": usernamevld,
        "password": passwordvld,
        "firstname": firstnamevld,
        "lastname": lastnamevld,
        "address": addressvld,
        "city": cityvld,
        "zipcode": zipcodevld,
        "phoneNumber": PhoneNumbervld

         })
         .then((response) => { JSON.stringify(response)})
         .catch(error => {
            console.log(error);
          });
    }
    export default Delete;