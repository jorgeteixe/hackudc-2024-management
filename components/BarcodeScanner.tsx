import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";

type BarcodeScannerProps = {
  callback: (result: string) => void;
  paused?: boolean;
};

export default function BarcodeScanner(props: BarcodeScannerProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // after gaining access, enumerate devices
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          setDevices(videoDevices);
          if (videoDevices.length > 0) {
            if (videoDevices.length === 7) {
              setSelectedDeviceId(videoDevices[5].deviceId);
            } else {
              setSelectedDeviceId(videoDevices[0].deviceId);
            }
          }
        });

        // stop the stream as we only needed it for access
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
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
              {device.label || "Camera"}
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
}
