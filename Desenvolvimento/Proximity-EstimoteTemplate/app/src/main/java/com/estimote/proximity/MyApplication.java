package com.estimote.proximity;

import android.app.Application;

import com.estimote.proximity_sdk.api.EstimoteCloudCredentials;

//
// Running into any issues? Drop us an email to: contact@estimote.com
//

public class MyApplication extends Application {

    public EstimoteCloudCredentials cloudCredentials =
            new EstimoteCloudCredentials("ips-furb-64r", "ade50863aaedc4be80ae2db911441c15");
}
