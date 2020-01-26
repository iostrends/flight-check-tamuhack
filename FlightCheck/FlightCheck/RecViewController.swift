//
//  RecViewController.swift
//  FlightCheck
//
//  Created by Matthew Onghai on 1/25/20.
//  Copyright © 2020 Matthew Onghai. All rights reserved.
//

import UIKit

class RecViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        let defaults = UserDefaults.standard
        let importedArray = defaults.object(forKey: "queryArray") as? [String] ?? [String]()
        print(importedArray)
        defaults.set(nil, forKey: "queryArray")
        
        self.view.backgroundColor = #colorLiteral(red: 0.9254902005, green: 0.2352941185, blue: 0.1019607857, alpha: 1)
    }
    
    func showView(sender: AnyObject) {
    }


}
