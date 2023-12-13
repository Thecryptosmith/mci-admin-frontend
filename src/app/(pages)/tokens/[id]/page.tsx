import CreateTokenForm from "@src/app/components/CreateTokenForm/CreateTokenForm";

type EditTokenPageProps = {
  params: {
    id: number;
  };
};

export default function EditTokenPage({ params }: EditTokenPageProps) {
  return (
    <>
      <CreateTokenForm id={params.id} isEdit />
    </>
  );
}
