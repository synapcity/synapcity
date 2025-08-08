"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/atoms/ui/dialog";
import { Input, Label, IconButton } from "@/components/atoms";
import { Switch } from "@/components/molecules";
import { useWeatherStore } from "@/stores/weatherStore";
import { useModalStore } from "@/stores/ui/modalStore/useModalStore";
import { getWeather } from "@/lib";

export function WeatherSettingsModal() {
  const isOpen = useModalStore((s) => s.modalType) === "weatherSettings";
  const close = useModalStore((s) => s.closeModal);
  const setPreferences = useWeatherStore((s) => s.setPreferences);
  const preferences = useWeatherStore((s) => s.preferences);
  const setLoading = useWeatherStore(s => s.setLoading)
  const setData = useWeatherStore(s => s.setData)
  const [zipcode, setZipcode] = useState(preferences.zipcode ?? "");
  const [unit, setUnit] = useState(preferences.unit);
  const [alertsEnabled, setAlertsEnabled] = useState(preferences.alertsEnabled);

  useEffect(() => {
    if (!isOpen) {
      setZipcode(preferences.zipcode || "");
      setUnit(preferences.unit);
      setAlertsEnabled(preferences.alertsEnabled);
    }
  }, [isOpen, preferences.alertsEnabled, preferences.unit, preferences.zipcode]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Weather Settings</DialogTitle>
        </DialogHeader>
        <DialogDescription id="weather-settings-description" className="sr-only">
          Customize your local weather settings.
        </DialogDescription>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="zipcode">Zip Code</Label>
            <div className="flex">
              <Input
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && zipcode.trim() !== "") {
                    setPreferences({ zipcode, locationSource: "zip" });
                    close();
                  }
                }}
                placeholder="e.g. 10001"
              />
              <IconButton
                icon="locate"
                onClick={() => {
                  if (!navigator.geolocation) return;

                  setLoading(true);

                  navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                      const { latitude, longitude } = pos.coords;

                      setLoading(true);
                      setData(null)
                      setPreferences({
                        unit: preferences.unit,
                        alertsEnabled: preferences.alertsEnabled,
                        locationSource: "gps",
                        gpsCoords: { lat: latitude, lon: longitude },
                        zipcode: null,
                      });

                      const weather = await getWeather({
                        unit: preferences.unit,
                        lat: latitude,
                        lon: longitude,
                      });

                      if (weather) setData(weather);
                      setLoading(false);
                      close();
                    },
                    (err) => {
                      console.error("Geolocation error:", err.message);
                      setLoading(false);
                    }
                  );

                }}

              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="unit">Use Fahrenheit</Label>
            <Switch
              id="unit"
              checked={unit === "fahrenheit"}
              onCheckedChange={(checked) => {
                const newUnit = checked ? "fahrenheit" : "celsius";
                setUnit(newUnit);
                setPreferences({ unit: newUnit });
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="alerts">Rain Alerts</Label>
            <Switch
              id="alerts"
              checked={alertsEnabled}
              onCheckedChange={(checked) => {
                setAlertsEnabled(checked);
                setPreferences({ alertsEnabled: checked });
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
