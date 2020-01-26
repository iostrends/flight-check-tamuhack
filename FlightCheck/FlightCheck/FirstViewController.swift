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
    
    // handle creation of cell
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "checklistItem", for: indexPath) as! checkCell
        cell.checkLabel.text = (itemsToAdd[indexPath.row] as! String)
        return cell
    }

    // handle clicking of cells
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let cell = tableView.cellForRow(at: indexPath) as! checkCell
        
        if cell.isChecked == false {
            cell.checkImage.image = UIImage(systemName: "checkmark.circle")
            cell.checkImage.tintColor = #colorLiteral(red: 0.2392156869, green: 0.6745098233, blue: 0.9686274529, alpha: 1)
            cell.isChecked = true
        } else {
            cell.checkImage.image = UIImage(systemName: "minus.circle")
            cell.checkImage.tintColor = #colorLiteral(red: 0.9254902005, green: 0.2352941185, blue: 0.1019607857, alpha: 1)
            cell.isChecked = false
        }
    }
    
    // handle addition of custom cells
    @IBAction func addItem(_ sender: Any) {
        let addAlert = UIAlertController(title: "Add new item", message: "Add your item!", preferredStyle: .alert)
        
        addAlert.addTextField()
        let addAlertAction = UIAlertAction(title: "Add", style: .default) {(action) in
            let newItem = addAlert.textFields![0]
            self.itemsToAdd.append(newItem.text!)
            self.checklistTableView.reloadData();
        }
        
        let cancelAction = UIAlertAction(title: "Cancel", style: .default)
        
        addAlert.addAction(addAlertAction)
        addAlert.addAction(cancelAction)
        
        present(addAlert, animated: true, completion: nil)
    }
    
    // handle swipe to delete item in checklist
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        
        if editingStyle == .delete {
            itemsToAdd.remove(at: indexPath.row)
            checklistTableView.reloadData()
        }
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

