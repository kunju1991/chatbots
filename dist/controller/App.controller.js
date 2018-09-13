sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"sap/ui/vbm/AnalyticMap"
], function(Controller, Device, JSONModel, AnalyticMap) {
	"use strict";

	AnalyticMap.GeoJSONURL = "demo/mapanalyticMap/Geo.json";

	return Controller.extend("demo.mapanalyticMap.controller.App", {
			onInit: function() {
				//set Device Model
				var oDeviceModel = new JSONModel(Device);
				this.getView().setModel(oDeviceModel, "device");
				//set Default Application Model
				var oModel = new JSONModel("demo.mapanalyticMap.Data");
				this.getView().setModel(oModel);
				/*			var oData = {
								regionProperties: [{
									"code": "DE",
									"color": "rgba(184,225,245,1.0)",
									"tooltip": "Germany\r\nBIP: 3.577 Mrd. USD\r\nPopulation: 80,716 Mio"
								}, {
									"code": "FR",
									"color": "rgba(5,71,102,1.0)"
								}, {
									"code": "IT",
									"color": "rgba(0,125,192,1.0)"
								}]
							};
							var oVBI = new sap.ui.vbm.AnalyticMap('vbi', {
								width: 1024,
								height: 512,
								regions: {
									path: "/regionProperties",
									template: new sap.ui.vbm.Region({
										code: "{code}",
										color: '{color}',
										tooltip: '{tooltip}'
									})
								}
							});

							oVBI.setModel(oModel);

							oVBI.placeAt("content");*/
			},
			onAfterRendering: function() {
				this.byId("vbi").zoomToRegions(["IN"]);
			},
			onPressLegend: function() {
			if (this.byId("vbi").getLegendVisible() == true) {
				this.byId("vbi").setLegendVisible(false);
				this.byId("btnLegend").setTooltip("Show legend");
			} else {
				this.byId("vbi").setLegendVisible(true);
				this.byId("btnLegend").setTooltip("Hide legend");
			}
		},

		onPressResize: function() {
			if (this.byId("btnResize").getTooltip() == "Minimize") {
				if (sap.ui.Device.system.phone) {
					this.byId("vbi").minimize(132, 56, 1320, 560); //Height: 3,5 rem; Width: 8,25 rem
				} else {
					this.byId("vbi").minimize(168, 72, 1680, 720); //Height: 4,5 rem; Width: 10,5 rem
				}
				this.byId("btnResize").setTooltip("Maximize");
			} else {
				this.byId("vbi").maximize();
				this.byId("btnResize").setTooltip("Minimize");
			}
		},

		onRegionClick: function(e) {
			sap.m.MessageToast.show("onRegionClick " + e.getSource().mNames[e.getParameter("code")]);
		},

		onRegionContextMenu: function(e) {
			sap.m.MessageToast.show("onRegionContextMenu " + e.getSource().mNames[e.getParameter("code")]);
		},

		onClickItem: function(evt) {
			sap.m.MessageToast.show("onClick");
		},

		onContextMenuItem: function(evt) {
			sap.m.MessageToast.show("onContextMenu");
		},

		onClickRoute: function(evt) {
			sap.m.MessageToast.show("Route onClick");
		},

		onContextMenuRoute: function(evt) {
			sap.m.MessageToast.show("Route onContextMenu");
		}
	});
});