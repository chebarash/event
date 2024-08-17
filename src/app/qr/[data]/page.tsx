import Qr from "../../components/qr";

export default function QrPage({
  params: { data },
}: {
  params: { data: string };
}) {
  return <Qr data={decodeURIComponent(data)}></Qr>;
}
