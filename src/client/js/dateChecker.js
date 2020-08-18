function checkDate(first_date,second_date){
    console.log(":::Running checkDate :::", first_date, second_date);
    if (first_date < second_date){
        // alert("Departure date must be later than today's date");
        return true;
    }
    return false;
}

export {checkDate}