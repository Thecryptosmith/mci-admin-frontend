type UserPageProps = {
  params: {
    id: number;
  };
};

export default function UserPage({ params }: UserPageProps) {
  return (
    <>
      <div>{params.id}</div>
    </>
  );
}
