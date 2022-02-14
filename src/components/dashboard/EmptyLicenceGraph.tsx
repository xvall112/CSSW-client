import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  CardContent,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';

interface Props {
  pridelene: number;
  volne: number;
  celkem: number;
}

const EmptyLicenceGraph = ({ pridelene, volne, celkem }: Props) => {
  const theme = useTheme();

  const volnePercent = (volne / celkem) * 100;
  const obsazenePercent = (pridelene / celkem) * 100;

  const datas = {
    datasets: [
      {
        data: [volnePercent, obsazenePercent],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Volné', 'Přidělené']
  };

  const options = {
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Volné',
      value: volnePercent,
      color: theme.palette.success.main
    },
    {
      title: 'Přidělené',
      value: obsazenePercent,
      color: theme.palette.warning.main
    }
  ];

  return (
    <CardContent>
      <Box
        sx={{
          width: '100%',
          position: 'relative'
        }}
      >
        <Doughnut data={datas} options={options} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {devices.map(({ color, title, value }) => (
          <Box
            key={title}
            sx={{
              p: 1,
              textAlign: 'center'
            }}
          >
            <Typography color="textPrimary" variant="h6">
              {title}
            </Typography>
            <Typography style={{ color }} variant="body1">
              {value.toFixed(1)}%
            </Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
  );
};

export default EmptyLicenceGraph;
