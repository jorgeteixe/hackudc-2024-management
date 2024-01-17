"use client";
import { useZxing } from "react-zxing";

type BarcodeScannerProps = {
  callback: (result: string) => void;
};

export const BarcodeScanner = (props: BarcodeScannerProps) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      props.callback(result.getText());
    },
  });

  return <video ref={ref} className="max-w-sm rounded-lg" />;
};
