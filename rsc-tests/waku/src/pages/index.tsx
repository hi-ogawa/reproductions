export default async function HomePage() {
  return (
    <div>
      Home Page
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
