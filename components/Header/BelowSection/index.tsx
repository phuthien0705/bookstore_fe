import { Container, Stack, Divider, Link, Box } from '@mui/material';
import { FC } from 'react';

let GenreList: Array<string>;
GenreList = [
  'Best Seller',
  'Văn Học',
  'Sách Giáo Khoa',
  'Kinh Tế',
  'Tâm Lý - Kỹ Năng',
];

interface IBelow {
  List?: Array<string>;
}

const BelowSection: FC<IBelow> = ({ List = GenreList }) => {
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
    >
      {List.map((item, index) => (
        <div key={index}>
          <Link key={index} href="#" underline="hover">
            {item}
          </Link>
          <Divider style={{ width: '1%', borderColor: 'white' }} />
        </div>
      ))}
      <Box sx={{ flexGrow: 0.7 }} />
      <Link href="#" underline="none" color="secondary">
        Giới Thiệu
      </Link>
      <Divider style={{ width: '1%' }} />
      <Link href="#" underline="none" color="secondary">
        Tải Ứng Dụng
      </Link>
    </Container>
  );
};

export default BelowSection;
