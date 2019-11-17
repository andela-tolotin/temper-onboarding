<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Contract\DataSourceInterface;
use App\Repositories\ChartPlotterRepository;

class HomeController extends Controller
{
    /**
     * @var $dataReader
     */
    private $dataReader;

    public function __construct(DataSourceInterface $dataReader)
    {
        $this->dataReader = $dataReader;
    }

    public function index()
    {
        return view("home");
    }

    /**
     * This method gets the chart series data
     *
     * @return response
     */
    public function fetchChartData()
    {
        try {
            $file = resource_path() . '/assets/documents/temper.csv';
            $this->dataReader->readFile($file);
            $this->chartPlotterRepository = new ChartPlotterRepository($this->dataReader);

            return response()->json($this->chartPlotterRepository->getChartSeries());
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getStatusCode());
        }
    }
}
