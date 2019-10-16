"use strict"

import _ from "underscore";
import * as config from "../framework/config";
import {optional} from "./lang";
import {addToken} from "../api/utils";

export function collectionUnion() {
    var args = Array.prototype.slice.call(arguments);
    var it = args.pop();

    return _.uniq(_.flatten(args, true), it);
}

export function downloadFile(path, filename) {

    let url = config.get("attachment.download") + "?path=" + path + "&filename=" + optional(filename);
    //window.open(url)

    downloadFileFromUrl(url);

}

export function downloadFileFromUrl(url) {
    $.ajax({
        url: url,
        method: "GET",
        headers: addToken({}),
        dataType: "text",
        //accept: accept == null ? undefined : accept,
        //contentType: contentType == null ? undefined : contentType,
        success: function(response) {

            let rsp = JSON.parse(response);

            download(rsp.base64String, rsp.filename, rsp.mimeType);
        },
        error: function(xhr, err) {

        }
    })

}