//
//  checkCell.swift
//  FlightCheck
//
//  Created by Matthew Onghai on 1/25/20.
//  Copyright © 2020 Matthew Onghai. All rights reserved.
//

import UIKit

class checkCell: UITableViewCell {

    @IBOutlet weak var checkLabel: UILabel!
    @IBOutlet weak var checkImage: UIImageView!
    var isChecked = false
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
