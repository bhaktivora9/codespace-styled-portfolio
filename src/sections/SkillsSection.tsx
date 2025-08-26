import React, { useState, useMemo, useCallback } from 'react';
import { Code2, Search, X, ChevronDown, Filter, Grid3X3, List } from 'lucide-react';
import { skills } from '../data/portfolio';

type ViewMode = 'grid' | 'compact';

interface SkillItem {
  name: string;
  
  badgeLight: string;
  badgeDark: string;
}

interface Skill extends SkillItem {
  category: string;
  
  score: number;
}


const skillLevelScale = [
  { level: 1, label: "Heard of it", description: "Aware it exists; never used." },
  { level: 2, label: "Explored", description: "Briefly explored documentation or watched tutorials." },
  { level: 3, label: "Tinkered", description: "Tried small examples or toy projects." },
  { level: 4, label: "Learning", description: "Currently learning; can build basic use cases with help." },
  { level: 5, label: "Beginner", description: "Can use independently for small tasks; needs frequent reference." },
  { level: 6, label: "Comfortable", description: "Can develop standard features with moderate support." },
  { level: 7, label: "Proficient", description: "Can build, debug, and optimize full components or modules." },
  { level: 8, label: "Advanced", description: "Can architect solutions and mentor others." }
];

const SkillsSection: React.FC = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // Get current theme from document
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  });
  
  // Listen for theme changes
  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setIsDarkTheme(document.documentElement.getAttribute('data-theme') === 'dark');
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  // Memoized data processing
  const { categories, levels } = useMemo(() => {
    const categorySet = new Set<string>();
    const levelLabels = new Set<string>();
    
    categorySet.add("All Categories");
    levelLabels.add("All Levels");
    
    skills.forEach(skill => {
      categorySet.add(skill.category);
      const levelInfo = skillLevelScale.find(l => l.level === skill.score);
      if (levelInfo) {
        levelLabels.add(levelInfo.label);
      }
    });
    
    return {
      categories: Array.from(categorySet),
      levels: Array.from(levelLabels)
    };
  }, []);

  // Memoized filtered and sorted skills
  const filteredSkills = useMemo(() => {
    let filtered = skills.filter(skill => {
      const matchesCategory = selectedCategory === "All Categories" || skill.category === selectedCategory;
      
      let matchesLevel = true;
      if (selectedLevel !== "All Levels") {
        const levelInfo = skillLevelScale.find(l => l.label === selectedLevel);
        matchesLevel = levelInfo ? skill.score === levelInfo.level : false;
      }
      
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesLevel && matchesSearch;
    });


    return filtered;
  }, [selectedCategory, selectedLevel, searchTerm]);

  // Get skill counts for each category/level
  const getCategoryCount = useCallback((category: string) => {
    if (category === "All Categories") return skills.length;
    return skills.filter(skill => skill.category === category).length;
  }, []);

  const getLevelCount = useCallback((level: string) => {
    if (level === "All Levels") return skills.length;
    const levelInfo = skillLevelScale.find(l => l.label === level);
    return levelInfo ? skills.filter(skill => skill.score === levelInfo.level).length : 0;
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
    setSearchTerm("");
  }, []);

  // Check if any filters are active
  const hasActiveFilters = selectedCategory !== "All Categories" || 
                          selectedLevel !== "All Levels" || 
                          searchTerm !== "";

  // Group skills by category for display
  const groupedSkills = useMemo(() => {
    const groups: { [key: string]: Skill[] } = {};
    
    // Get unique categories from filtered skills in original order
    const uniqueCategories = Array.from(new Set(
      skills.map(skill => skill.category)
    ));
    
    uniqueCategories.forEach(category => {
      const categorySkills = filteredSkills.filter(skill => skill.category === category);
      if (categorySkills.length > 0) {
        groups[category] = categorySkills;
      }
    });
  
    return groups;
  }, [filteredSkills]);
  
  console.log(groupedSkills.length);
  return (
    <div id="skills-section-container" className="animate-fade-in-up px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div id="skills-section-header" className="mb-4 sm:mb-6 md:mb-8 transform transition-all duration-500">
        <h1 id="skills-section-title" className="text-lg sm:text-xl md:text-2xl font-bold text-primary-themed font-sans mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3 transition-colors duration-300">
          <Code2 id="skills-section-icon" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 hover:scale-110" style={{ color: 'var(--vscode-accent)' }} />
          <span id="skills-section-title-text" className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--vscode-accent), var(--vscode-accent))` }}>
            Technical Skills
          </span>
        </h1>
        <div id="skills-section-divider" className="w-16 sm:w-20 h-0.5 sm:h-1 rounded-full mb-3 sm:mb-4 md:mb-6" style={{ background: `linear-gradient(to right, var(--vscode-yellow), var(--vscode-accent))` }}></div>
      </div>

      {/* Search and Filters Layout */}
      <div id="skills-search-filters" className="flex-row mb-3 sm:mb-4 md:mb-6 space-y-2 sm:space-y-3 md:space-y-4">
        {/* Search, Filters and View Toggle in One Line for Large Screens */}
        <div id="skills-search-filter-row" className="flex flex-col lg:flex-row justify lg:items-center gap-2 sm:gap-3 md:gap-4">
          {/* Search Bar */}
          <div id="skills-search-container" className="relative flex-1 items-start max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg order-2 lg:order-1">
            <div id="skills-search-icon-container" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search id="skills-search-icon" className="h-3 w-3 sm:h-4 sm:w-4 text-vscode-secondary" />
            </div>
            <input
              id="skills-search-input"
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 border-0 rounded-md sm:rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 bg-secondary-themed text-themed placeholder-secondary-themed font-sans shadow-sm"
            />
            {searchTerm && (
              <button
                id="skills-search-clear-button"
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center
                  text-vscode-secondary hover:text-themed transition-colors"
              >
                <X id="skills-search-clear-icon" className="h-3 w-3 sm:h-4 sm:h-4" />
              </button>
            )}
          </div>

          {/* Mobile: Filter and View Toggle in same line */}
          <div id="skills-mobile-controls" className="flex lg:hidden items-center justify-between w-full gap-2 sm:gap-3 order-1">
            {/* Filter Controls */}
            <div id="skills-filter-controls-mobile" className="flex items-center gap-2 sm:gap-3">
              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div id="skills-active-filters-mobile" className="flex items-center gap-2 text-xs text-vscode-secondary">
                  <span id="skills-active-filters-label-mobile" className="font-medium">Active filters:</span>
                  {selectedCategory !== "All Categories" && (
                    <span id="skills-active-category-filter-mobile" className="px-2 py-1 bg-tertiary-themed rounded-full text-xs font-sans">
                      {selectedCategory}
                    </span>
                  )}
                  {selectedLevel !== "All Levels" && (
                    <span id="skills-active-level-filter-mobile" className="px-2 py-1 bg-tertiary-themed rounded-full text-xs font-sans">
                      {selectedLevel}
                    </span>
                  )}
                </div>
              )}
            
              {/* Filter Dropdown */}
              <div id="skills-filter-dropdown-container-mobile" className="relative items-start flex items-center gap-2 sm:gap-3">
                <button
                  id="skills-filter-dropdown-button-mobile"
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                  }}
                  className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-tertiary-themed border border-themed rounded-md sm:rounded-lg 
                    text-xs sm:text-sm font-medium text-themed hover-themed transition-all duration-200 font-sans shadow-sm"
                >
                  <Filter id="skills-filter-icon-mobile" className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span id="skills-filter-text-mobile">Filters</span>
                  <ChevronDown id="skills-filter-chevron-mobile" className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>
              
                {showCategoryDropdown && (
                  <div id="skills-filter-dropdown-mobile" className="absolute top-full left-0 mt-2 w-56 sm:w-64 bg-secondary-themed border border-themed rounded-md sm:rounded-lg shadow-lg z-50 max-h-60 sm:max-h-80 overflow-y-auto">
                    {/* Category Section */}
                    <div id="skills-category-filter-header-mobile" className="px-3 py-2 border-b border-themed bg-tertiary-themed">
                      <span id="skills-category-filter-title-mobile" className="text-xs font-semibold text-primary-themed uppercase tracking-wider font-sans">
                        Filter by Category
                      </span>
                    </div>
                    {categories.map((category) => (
                      <button
                        key={category}
                        id={`skills-category-filter-mobile-${category.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 sm:py-2.5 text-xs sm:text-sm hover-themed transition-colors duration-200 flex items-center justify-between font-sans ${
                          selectedCategory === category ? 'bg-tertiary-themed text-primary-themed font-medium' : 'text-vscode-secondary'
                        }`}
                      >
                        <span id={`skills-category-name-mobile-${category.replace(/\s+/g, '-').toLowerCase()}`}>{category}</span>
                        <span id={`skills-category-count-mobile-${category.replace(/\s+/g, '-').toLowerCase()}`} className="text-xs bg-themed px-1.5 py-0.5 rounded-full">
                          {getCategoryCount(category)}
                        </span>
                      </button>
                    ))}
                  
                    {/* Level Section */}
                    <div id="skills-level-filter-header-mobile" className="px-3 py-2 border-b border-themed bg-tertiary-themed border-t">
                      <span id="skills-level-filter-title-mobile" className="text-xs font-semibold text-primary-themed uppercase tracking-wider font-sans">
                        Filter by Level
                      </span>
                    </div>
                    {levels.map((level) => (
                      <button
                        key={level}
                        id={`skills-level-filter-mobile-${level.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => {
                          setSelectedLevel(level);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 sm:py-2.5 text-xs sm:text-sm hover-themed transition-colors duration-200 capitalize flex items-center justify-between font-sans ${
                          selectedLevel === level ? 'bg-tertiary-themed text-primary-themed font-medium' : 'text-vscode-secondary'
                        }`}
                      >
                        <span id={`skills-level-name-mobile-${level.replace(/\s+/g, '-').toLowerCase()}`}>{level}</span>
                        <span id={`skills-level-count-mobile-${level.replace(/\s+/g, '-').toLowerCase()}`} className="text-xs bg-themed px-1.5 py-0.5 rounded-full">
                          {getLevelCount(level)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            
              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  id="skills-clear-filters-button-mobile"
                  onClick={clearFilters}
                  className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium 
                    bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-200 font-sans shadow-sm border border-red-500/20"
                >
                  <X id="skills-clear-filters-icon-mobile" className="w-3 h-3 sm:w-4 sm:h-4" />
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Toggle - Mobile */}
            <div id="skills-view-mode-toggle-mobile" className="flex items-center gap-1 bg-secondary-themed rounded-md sm:rounded-lg p-1">
              <button
                id="skills-grid-view-button-mobile"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-themed shadow-sm text-primary-themed' : 'text-vscode-secondary hover:text-themed'
                }`}
              >
                <Grid3X3 id="skills-grid-view-icon-mobile" className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                id="skills-compact-view-button-mobile"
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  viewMode === 'compact' ? 'bg-themed shadow-sm text-primary-themed' : 'text-vscode-secondary hover:text-themed'
                }`}
              >
                <List id="skills-compact-view-icon-mobile" className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Desktop: Filter Controls */}
          <div id="skills-filter-controls-desktop" className="hidden justify-end lg:flex  gap-2 sm:gap-3 order-2">
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div id="skills-active-filters-desktop" className="flex items-center gap-2 text-xs text-vscode-secondary">
                <span id="skills-active-filters-label-desktop" className="font-medium">Active filters:</span>
                {selectedCategory !== "All Categories" && (
                  <span id="skills-active-category-filter-desktop" className="px-2 py-1 bg-tertiary-themed rounded-full text-xs font-sans">
                    {selectedCategory}
                  </span>
                )}
                {selectedLevel !== "All Levels" && (
                  <span id="skills-active-level-filter-desktop" className="px-2 py-1 bg-tertiary-themed rounded-full text-xs font-sans">
                    {selectedLevel}
                  </span>
                )}
              </div>
            )}
          
            {/* Filter Dropdown */}
            <div id="skills-filter-dropdown-container-desktop" className="relative justify-end flex items-center gap-2 sm:gap-3">
              <button
                id="skills-filter-dropdown-button-desktop"
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                }}
                className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-tertiary-themed border border-themed rounded-md sm:rounded-lg 
                  text-xs sm:text-sm font-medium text-themed hover-themed transition-all duration-200 font-sans shadow-sm"
              >
                <Filter id="skills-filter-icon-desktop" className="w-3 h-3 sm:w-4 sm:h-4" />
                <span id="skills-filter-text-desktop">Filters</span>
                <ChevronDown id="skills-filter-chevron-desktop" className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>
            
              {showCategoryDropdown && (
                <div id="skills-filter-dropdown-desktop" className="absolute top-full left-0 mt-2 w-56 sm:w-64 bg-secondary-themed border border-themed rounded-md sm:rounded-lg shadow-lg z-50 max-h-60 sm:max-h-80 overflow-y-auto">
                  {/* Category Section */}
                  <div id="skills-category-filter-header-desktop" className="px-3 py-2 border-b border-themed bg-tertiary-themed">
                    <span id="skills-category-filter-title-desktop" className="text-xs font-semibold text-primary-themed uppercase tracking-wider font-sans">
                      Filter by Category
                    </span>
                  </div>
                  {categories.map((category) => (
                    <button
                      key={category}
                      id={`skills-category-filter-desktop-${category.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 sm:py-2.5 text-xs sm:text-sm hover-themed transition-colors duration-200 flex items-center justify-between font-sans ${
                        selectedCategory === category ? 'bg-tertiary-themed text-primary-themed font-medium' : 'text-vscode-secondary'
                      }`}
                    >
                      <span id={`skills-category-name-desktop-${category.replace(/\s+/g, '-').toLowerCase()}`}>{category}</span>
                      <span id={`skills-category-count-desktop-${category.replace(/\s+/g, '-').toLowerCase()}`} className="text-xs bg-themed px-1.5 py-0.5 rounded-full">
                        {getCategoryCount(category)}
                      </span>
                    </button>
                  ))}
                
                  {/* Level Section */}
                  <div id="skills-level-filter-header-desktop" className="px-3 py-2 border-b border-themed bg-tertiary-themed border-t">
                    <span id="skills-level-filter-title-desktop" className="text-xs font-semibold text-primary-themed uppercase tracking-wider font-sans">
                      Filter by Level
                    </span>
                  </div>
                  {levels.map((level) => (
                    <button
                      key={level}
                      id={`skills-level-filter-desktop-${level.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => {
                        setSelectedLevel(level);
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 sm:py-2.5 text-xs sm:text-sm hover-themed transition-colors duration-200 capitalize flex items-center justify-between font-sans ${
                        selectedLevel === level ? 'bg-tertiary-themed text-primary-themed font-medium' : 'text-vscode-secondary'
                      }`}
                    >
                      <span id={`skills-level-name-desktop-${level.replace(/\s+/g, '-').toLowerCase()}`}>{level}</span>
                      <span id={`skills-level-count-desktop-${level.replace(/\s+/g, '-').toLowerCase()}`} className="text-xs bg-themed px-1.5 py-0.5 rounded-full">
                        {getLevelCount(level)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          
            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                id="skills-clear-filters-button-desktop"
                onClick={clearFilters}
                className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium 
                  bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-200 font-sans shadow-sm border border-red-500/20"
              >
                <X id="skills-clear-filters-icon-desktop" className="w-3 h-3 sm:w-4 sm:h-4" />
                Clear
              </button>
            )}
          </div>

          {/* View Mode Toggle - Desktop (rightmost) */}
          <div id="skills-view-mode-toggle-desktop" className="hidden lg:flex justify-end items-center gap-1 bg-secondary-themed rounded-md sm:rounded-lg p-1 order-3">
            <button
              id="skills-grid-view-button-desktop"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                viewMode === 'grid' ? 'bg-themed shadow-sm text-primary-themed' : 'text-vscode-secondary hover:text-themed'
              }`}
            >
              <Grid3X3 id="skills-grid-view-icon-desktop" className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              id="skills-compact-view-button-desktop"
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                viewMode === 'compact' ? 'bg-themed shadow-sm text-primary-themed' : 'text-vscode-secondary hover:text-themed'
              }`}
            >
              <List id="skills-compact-view-icon-desktop" className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Skills Display */}
      <div id="skills-display-container" className="mb-3 sm:mb-4 md:mb-6">
        {filteredSkills.length > 0 ? (
          <>
            <div id="skills-grid-container" className={`${
              viewMode === 'grid' 
                ? 'hidden sm:grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3'
                : 'grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 gap-1 sm:gap-2'
            }`}>
              {filteredSkills.map((skill, index) => (
                <SkillCard key={`${skill.name}-${skill.category}`} skill={skill} index={index} viewMode={viewMode} isDarkTheme={isDarkTheme} />
              ))}
            </div>
            {/* Mobile Grid View - Icons Only */}
            {viewMode === 'grid' && (
              <div id="skills-mobile-grid" className="sm:hidden grid grid-cols-6 gap-2">
                {filteredSkills.map((skill, index) => (
                  <SkillCard key={`${skill.name}-${skill.category}-mobile`} skill={skill} index={index} viewMode="compact" isDarkTheme={isDarkTheme} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div id="skills-no-results" className="text-center py-6 sm:py-8 md:py-12">
            <div id="skills-no-results-icon-container" className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary-themed rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Search id="skills-no-results-icon" className="w-6 h-6 sm:w-8 sm:h-8 text-vscode-secondary" />
            </div>
            <h3 id="skills-no-results-title" className="text-sm sm:text-base font-semibold text-themed mb-2 font-sans">No skills found</h3>
            <p id="skills-no-results-description" className="text-xs sm:text-sm text-vscode-secondary mb-4 sm:mb-6 max-w-xs sm:max-w-md mx-auto font-sans">
              We couldn't find any skills matching your current filters. Try adjusting your search or filters.
            </p>
            <button
              id="skills-no-results-clear-button"
              onClick={clearFilters}
              className="px-3 py-2 sm:px-4 sm:py-2.5 bg-primary-themed text-white rounded-md sm:rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm font-sans"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Summary */}
      
    </div>
  );
};

// SkillCard component
const SkillCard: React.FC<{ skill: Skill; index: number; viewMode: ViewMode; isDarkTheme: boolean }> = ({ skill, index, viewMode, isDarkTheme }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
 /* const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-500';
    if (score >= 5) return 'text-yellow-500';
    if (score >= 3) return 'text-orange-500';
    return 'text-red-500';
  };*/

  const getScoreLabel = (score: number) => {
    const level = skillLevelScale.find(l => l.level === score);
    return level ? level.label : 'Unknown';
  };

/*  const getScoreDescription = (score: number) => {
    const level = skillLevelScale.find(l => l.level === score);
    return level ? level.description : '';
  };
*/
  return (
    <div
      id={`skill-card-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
      className="group animate-in fade-in slide-in-from-bottom-4 duration-300"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className={`relative bg-secondary-themed  shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 h-full ${
        viewMode === 'grid' 
          ? 'p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl' 
          : 'p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg'
      }`}>
        <div id={`skill-card-content-${skill.name.replace(/\s+/g, '-').toLowerCase()}`} className="flex flex-col items-center text-center h-full">
          <div id={`skill-card-icon-container-${skill.name.replace(/\s+/g, '-').toLowerCase()}`} className={`${viewMode === 'grid' ? 'mb-3 sm:mb-4 md:mb-6' : 'mb-0'} flex-1 flex items-center justify-center`}>
            <img
              id={`skill-card-icon-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
              src={isDarkTheme ? skill.badgeDark : skill.badgeLight}
              alt={skill.name}
              className={`object-contain ${
                viewMode === 'grid' ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12' : 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'
              } transition-transform duration-300 groupx-hover:scale-110 filter drop-shadow-md`}
            />
          </div>
          {viewMode === 'grid' && (
            <h3 id={`skill-card-name-${skill.name.replace(/\s+/g, '-').toLowerCase()}`} className="text-xs sm:text-sm md:text-base font-medium text-themed mt-2 sm:mt-3 md:mt-4 font-sans">{skill.name}</h3>
          )}
        </div>
        
        {/* Compact View Tooltip */}
        <div
          id={`skill-card-tooltip-trigger-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {showTooltip && (
            <div id={`skill-card-tooltip-${skill.name.replace(/\s+/g, '-').toLowerCase()}`} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div id={`skill-card-tooltip-content-${skill.name.replace(/\s+/g, '-').toLowerCase()}`} className="bg-secondary-themed border border-themed backdrop-blur-sm text-themed text-xs rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-2 shadow-xl whitespace-nowrap">
                <div id={`skill-card-tooltip-name-${skill.name.replace(/\s+/g, '-').toLowerCase()}`} className="font-semibold">{skill.name}</div>
                <div id={`skill-card-tooltip-level-${skill.name.replace(/\s+/g, '-').toLowerCase()}`} className="text-vscode-secondary">{getScoreLabel(skill.score)} ({skill.score}/8)</div>
                {/* Arrow */}
                <div id={`skill-card-tooltip-arrow-${skill.name.replace(/\s+/g, '-').toLowerCase()}`} className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-secondary-themed"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;