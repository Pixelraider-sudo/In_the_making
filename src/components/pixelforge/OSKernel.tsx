import { useEffect, useState } from "react";
import { BootLoader } from "./BootLoader";
import { DesktopOS } from "./DesktopOS";

export function OSKernel() {
  console.log("🧠 OSKernel RENDER");

  const [booted, setBooted] = useState(false);

  useEffect(() => {
    console.log("⚙️ OSKernel MOUNTED");
  }, []);

  if (!booted) {
    console.log("⏳ SHOWING BOOTLOADER");

    return (
      <BootLoader
        onComplete={() => {
          console.log("✅ BOOT COMPLETE CALLBACK FIRED");
          setBooted(true);
        }}
      />
    );
  }

  console.log("🖥️ SHOWING DESKTOP");

  return <DesktopOS />;
}
