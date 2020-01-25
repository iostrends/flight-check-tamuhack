//
//  SecondViewController.swift
//  FlightCheck
//
//  Created by Matthew Onghai on 1/25/20.
//  Copyright © 2020 Matthew Onghai. All rights reserved.
//

import UIKit

class SecondViewController: UIViewController {

    @IBAction func nextViewButtonPressed(_ sender: Any) {
        print("Button Pressed")
        self.performSegue(withIdentifier: "CameraViewSegue", sender: self)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        // testing
        print("View has loaded")
    }


}

