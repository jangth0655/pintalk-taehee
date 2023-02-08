import Navbar from './navbar/Navbar';

interface Props {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: Props) => {
  return (
    <section>
      <Navbar title={title} />
      <main>{children}</main>
    </section>
  );
};
export default Layout;
