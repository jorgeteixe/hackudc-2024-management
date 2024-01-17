import React, { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

type BarcodeScannerProps = {
  callback: (result: string) => void;
  paused?: boolean;
};

export const BarcodeScanner = (props: BarcodeScannerProps) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    });
  }, []);

  const { ref } = useZxing({
    paused: !selectedDeviceId || props.paused,
    deviceId: selectedDeviceId,
    onDecodeResult(result) {
      props.callback(result.getText());
    },
  });

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(event.target.value);
  };

  return (
    <div>
      {devices.length > 0 && (
        <select
          onChange={handleDeviceChange}
          value={selectedDeviceId}
          className="bg-white border border-gray-300 w-full mb-2 rounded-md shadow-sm p-2 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || device.deviceId}
            </option>
          ))}
        </select>
      )}
      <video
        ref={ref}
        className="w-full aspect-square object-cover rounded-lg"
      />
    </div>
  );
};
