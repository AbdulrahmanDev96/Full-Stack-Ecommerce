import { Button, Drawer, Stack, Typography, IconButton, FormGroup, FormControlLabel, RadioGroup, Radio, Rating, Box } from '@mui/material';

// mui Icons
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearAllIcon from '@mui/icons-material/ClearAll';
// components
import useProduct from '../../app/hooks/useProduct';
import { useAppSelector, useAppDispatch } from '../../app/store/configureStore';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import { setProductParams } from '../../features/catalog/catalogSlice';

interface ShopFilterSidebarProps {
  openFilter: boolean;
  onOpenFilter: () => void;
  onCloseFilter: () => void;
  icon: string;
}

export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'] as const;

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter }: ShopFilterSidebarProps) {
  const { brands, types } = useProduct();
  const { productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  return (
    <>
      <Button disableRipple color="inherit" onClick={onOpenFilter}>
        Filters&nbsp;{<FilterListIcon/>}
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}></IconButton>
        </Stack>

        <Box sx={{ height: 'calc(100% - 56px)', overflowY: 'auto' }}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Brands
              </Typography>
              <FormGroup>
                <CheckboxButtons
                  items={brands}
                  checked={productParams.brands}
                  onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                />
              </FormGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup>
                <CheckboxButtons
                  items={types}
                  checked={productParams.types}
                  onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                />
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <RadioGroup>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                        sx={{
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                      />
                    }
                    label="& Up"
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      '&:hover': { opacity: 0.48 },
                    }}
                  />
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </Box>

        <Box sx={{ p: 3 }}>
          <Button fullWidth size="large" type="submit" color="inherit" variant="outlined">
          {<ClearAllIcon />} Filters&nbsp; 
          </Button>
        </Box>
      </Drawer>
    </>
  );
}