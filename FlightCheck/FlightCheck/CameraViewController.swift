//
//  CameraViewController.swift
//  FlightCheck
//
//  Created by Thuỵ Nguyễn on 1/25/20.
//  Copyright © 2020 Matthew Onghai. All rights reserved.
//

import UIKit
import AVKit

class CameraViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        // start up the camera
        let captureSession = AVCaptureSession()
        captureSession.sessionPreset = .photo
        
        guard let captureDevice = AVCaptureDevice.default(.builtInDualCamera,
        for: .video, position: .back) else { return }
        guard let input = try? AVCaptureDeviceInput(device: captureDevice) else { return }
        captureSession.addInput(input)
        
        captureSession.startRunning()
        
        let previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        view.layer.addSublayer(previewLayer)
        
        // classify a frame
        previewLayer.frame = view.frame
    }


}
