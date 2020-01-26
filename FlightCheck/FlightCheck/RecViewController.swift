//
//  RecViewController.swift
//  FlightCheck
//
//  Created by Matthew Onghai on 1/25/20.
//  Copyright © 2020 Matthew Onghai. All rights reserved.
//

import UIKit
import JavaScriptCore

class RecViewController: UIViewController {
    
    var jsContext: JSContext!
    
    func initializeJS() {
        self.jsContext = JSContext()
        
        // Specify the path to the jssource.js file.
        if let jsSourcePath = Bundle.main.path(forResource: "getFlightData", ofType: "js") {
            do {
                // Load its contents to a String variable.
                let jsSourceContents = try String(contentsOfFile: jsSourcePath)

                // Add the Javascript code that currently exists in the jsSourceContents to the Javascript Runtime through the jsContext object.
                self.jsContext.evaluateScript(jsSourceContents)
            }
            catch {
                print(error.localizedDescription)
            }
        }
    }
    
    func getWeatherItems() {
        if let functionFullname = self.jsContext.objectForKeyedSubscript("getMoreItems") {
            if let res = functionFullname.call(withArguments: [1653, ["HI"]]) {
                let itemsToAdd = res.toArray()
                print(itemsToAdd)
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let defaults = UserDefaults.standard
        initializeJS();
        getWeatherItems();
        let importedArray = defaults.object(forKey: "queryArray") as? [String] ?? [String]()
        print(importedArray)
        defaults.set(nil, forKey: "queryArray")
        
        self.view.backgroundColor = #colorLiteral(red: 0.9254902005, green: 0.2352941185, blue: 0.1019607857, alpha: 1)
    }
    
    func showView(sender: AnyObject) {
    }


}
