//
//  RecViewController.swift
//  FlightCheck
//
//  Created by Matthew Onghai on 1/25/20.
//  Copyright © 2020 Matthew Onghai. All rights reserved.
//

import UIKit

class Settings: UIViewController {

    @IBOutlet weak var textfield: UITextField!
    
    
    
    @IBAction func submit(_ sender: Any) {
        let defaults = UserDefaults.standard
        defaults.set(textfield.text, forKey: "flightNum")
        print(defaults.string(forKey: "flightNum"))
    }
    
    
    
    override func viewDidLoad() {
        print("loaded")
        self.view.backgroundColor = #colorLiteral(red: 0.9254902005, green: 0.2352941185, blue: 0.1019607857, alpha: 1)
    }



}
