// Testing javascript and swift

// Default list for checklist in app
// param myBool == true will return the list, else it will return a list with "fail" in it
function test(myBool){
    if(myBool){
        return ['Hair brush', 
            'Toothbrush', 
            'Toothpaste', 
            'Deodorant', 
            'Wallet', 
            'Earbuds', 
            'Underwear', 
            'Socks', 
            'Shirts', 
            'Pants'
        ];
    }
    return ['fail'];
}
