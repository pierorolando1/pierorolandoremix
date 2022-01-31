import { Input } from "@nextui-org/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <Input.Password
        width="10"
        labelPlaceholder="Password"
      />
    </div>
  );
}
