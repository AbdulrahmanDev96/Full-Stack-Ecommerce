import { useState } from 'react';
// @mui
import { Menu, Button, Typography , List} from '@mui/material';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setProductParams } from '../../features/catalog/catalogSlice';

// component


// ----------------------------------------------------------------------
const sortOptions = [
  {value: "name", label: "Alphabetical"},
  {value: "priceDesc", label: "Price - High to low"},
  {value: "price", label: "Price - Low to high"},
];



export default function ShopProductSort() {
  const [open, setOpen] = useState(null);
  const {productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Newest
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        
          <List sx={{ml: 2}}>
          <RadioButtonGroup
              selectedValue={productParams.orderBy}
              options={sortOptions}
              onChange={(e) =>
                dispatch(setProductParams({ orderBy: e.target.value }))
              }
            />
          </List>
        
      </Menu>
    </>
  );
}
