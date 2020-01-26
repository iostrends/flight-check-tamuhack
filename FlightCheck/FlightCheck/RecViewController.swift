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
    
    @IBOutlet weak var toBringLabel: UILabel!
    @IBOutlet weak var recStatus: UILabel!
    
    
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
        let defaults = UserDefaults.standard
        let importedArray = defaults.object(forKey: "queryArray") as? [String] ?? [String]()
        
        if let functionFullname = self.jsContext.objectForKeyedSubscript("getMoreItems") {
            if let res = functionFullname.call(withArguments: [1653, importedArray]) {
                let itemsToAdd = res.toArray()
                print(itemsToAdd!)
                
                if(itemsToAdd!.count == 0) {
                    self.view.backgroundColor = #colorLiteral(red: 0.4666666687, green: 0.7647058964, blue: 0.2666666806, alpha: 1)
                    recStatus.text = "You're all set!"
                    toBringLabel.text = ""
                    
                } else {
                    recStatus.text = "You may want to bring these items:"
                    
                    var toRec = ""
                    
                    for item in itemsToAdd! {
                        toRec += item as! String
                        toRec += "     "
                    }
                    
                    toBringLabel.text = toRec
                    self.view.backgroundColor = #colorLiteral(red: 0.9254902005, green: 0.2352941185, blue: 0.1019607857, alpha: 1)
                }
                
                
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let defaults = UserDefaults.standard
        initializeJS();
        getWeatherItems();
        let importedArray = defaults.object(forKey: "queryArray") as? [String] ?? [String]()
//        print(importedArray)
        
        defaults.set(nil, forKey: "queryArray")
    }
    
    func showView(sender: AnyObject) {
    }


}
