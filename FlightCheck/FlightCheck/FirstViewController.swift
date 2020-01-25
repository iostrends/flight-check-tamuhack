//
//  FirstViewController.swift
//  FlightCheck
//
//  Created by Matthew Onghai on 1/25/20.
//  Copyright © 2020 Matthew Onghai. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    // table view of list
    @IBOutlet weak var checklistTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        checklistTableView.delegate = self
        checklistTableView.dataSource = self
        checklistTableView.rowHeight = 60
    }
    
    var itemsToAdd: [String] = ["Jacket", "Toothbrush"]
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    // return number of cells total
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return itemsToAdd.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "checklistItem", for: indexPath) as! checkCell
        cell.checkLabel.text = itemsToAdd[indexPath.row]
        
        return cell
    }



}

