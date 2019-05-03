using System;

namespace Lights.ViewModels
{
    public class LightsViewModel
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int Setting1 { get; set; }
        public int Setting2 { get; set; }
        public int Setting3 { get; set; }
        public string Pattern { get; set; }
        public DateTime Datetime { get; set; }
        public string AlgorithmParameter1 { get; set; }
        public string AlgorithmParameter2 { get; set; }
        public string AlgorithmParameter3 { get; set; }
        public string AlgorithmParameter4 { get; set; }
    }
}
