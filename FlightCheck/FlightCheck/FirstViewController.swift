//
//  FirstViewController.swift
//  FlightCheck
//
//  Created by Matthew Onghai on 1/25/20.
//  Copyright © 2020 Matthew Onghai. All rights reserved.
//

import UIKit
import JavaScriptCore

class FirstViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    // table view of list
    @IBOutlet weak var checklistTableView: UITableView!
    var jsContext: JSContext!
    
    var itemsToAdd: [Any] = ["Jacket", "Toothbrush"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        checklistTableView.delegate = self
        checklistTableView.dataSource = self
        checklistTableView.rowHeight = 60
        initializeJS()
        
        jsDemo1()
    }
    
    
    
    // checklist sections
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    // return number of cells total
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return itemsToAdd.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "checklistItem", for: indexPath) as! checkCell
        cell.checkLabel.text = (itemsToAdd[indexPath.row] as! String)
        
        return cell
    }



    
    
    
    
    
    
    
    func initializeJS() {
        self.jsContext = JSContext()
        
        // Specify the path to the jssource.js file.
        if let jsSourcePath = Bundle.main.path(forResource: "defaultList", ofType: "js") {
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
    
    func jsDemo1() {
        if let functionFullname = self.jsContext.objectForKeyedSubscript("test") {
            // Call the function that composes the fullname.
            if let res = functionFullname.call(withArguments: [true]) {
                itemsToAdd = res.toArray()
                print(itemsToAdd)
            }
        }
    }
    
    
}

