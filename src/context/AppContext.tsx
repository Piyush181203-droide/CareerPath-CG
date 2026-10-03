import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Career, StudentProfile } from '../types';
import { DEMO_STUDENT, DEMO_ADMIN, INITIAL_CAREERS } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  loginAs: (role: 'student' | 'admin' | 'guest') => void;
  logout: () => void;
  updateStudentProfile: (profile: StudentProfile) => void;
  
  // Saved items
  savedCareers: string[];
  savedCourses: string[];
  savedExams: string[];
  savedScholarships: string[];
  toggleSaveItem: (type: 'career' | 'course' | 'exam' | 'scholarship', id: string) => void;
  isItemSaved: (type: 'career' | 'course' | 'exam' | 'scholarship', id: string) => boolean;

  // Active roadmap & progress
  activeCareer: Career;
  setActiveCareer: (career: Career) => void;
  activeRouteId: string;
  setActiveRouteId: (routeId: string) => void;
  completedSteps: string[];
  toggleStepComplete: (stepId: string) => void;

  // Global modals & navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  selectedDetailCareer: Career | null;
  setSelectedDetailCareer: (career: Career | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('careerpath_user');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return DEMO_STUDENT;
  });

  const [activeCareer, setActiveCareer] = useState<Career>(() => {
    return INITIAL_CAREERS[0]; // Software Engineer
  });

  const [activeRouteId, setActiveRouteId] = useState<string>(() => {
    return INITIAL_CAREERS[0].routes[0]?.id || '';
  });

  const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
    return currentUser?.completedSteps || ['se-ra-1'];
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [selectedDetailCareer, setSelectedDetailCareer] = useState<Career | null>(null);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('careerpath_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('careerpath_user');
    }
  }, [currentUser]);

  const loginAs = (role: 'student' | 'admin' | 'guest') => {
    if (role === 'student') {
      setCurrentUser(DEMO_STUDENT);
      setCompletedSteps(DEMO_STUDENT.completedSteps);
    } else if (role === 'admin') {
      setCurrentUser(DEMO_ADMIN);
    } else {
      setCurrentUser(null);
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateStudentProfile = (profile: StudentProfile) => {
    if (currentUser) {
      const updatedUser: User = {
        ...currentUser,
        name: profile.fullName || currentUser.name,
        profile
      };
      setCurrentUser(updatedUser);
    } else {
      const newUser: User = {
        id: `student-${Date.now()}`,
        name: profile.fullName || 'Student',
        email: `${profile.fullName.toLowerCase().replace(/\s+/g, '')}@student.careerpathcg.edu`,
        role: 'student',
        profile,
        savedCareers: [],
        savedCourses: [],
        savedExams: [],
        savedScholarships: [],
        savedRoadmapIds: [],
        completedSteps: []
      };
      setCurrentUser(newUser);
    }
  };

  const toggleSaveItem = (type: 'career' | 'course' | 'exam' | 'scholarship', id: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const fieldMap = {
      career: 'savedCareers',
      course: 'savedCourses',
      exam: 'savedExams',
      scholarship: 'savedScholarships'
    } as const;

    const key = fieldMap[type];
    const currentList = currentUser[key] || [];
    const exists = currentList.includes(id);

    const updatedList = exists 
      ? currentList.filter(item => item !== id)
      : [...currentList, id];

    setCurrentUser({
      ...currentUser,
      [key]: updatedList
    });
  };

  const isItemSaved = (type: 'career' | 'course' | 'exam' | 'scholarship', id: string): boolean => {
    if (!currentUser) return false;
    const fieldMap = {
      career: 'savedCareers',
      course: 'savedCourses',
      exam: 'savedExams',
      scholarship: 'savedScholarships'
    } as const;
    const list = currentUser[fieldMap[type]] || [];
    return list.includes(id);
  };

  const toggleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      const exists = prev.includes(stepId);
      const updated = exists ? prev.filter(s => s !== stepId) : [...prev, stepId];
      if (currentUser) {
        setCurrentUser({ ...currentUser, completedSteps: updated });
      }
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginAs,
        logout,
        updateStudentProfile,
        savedCareers: currentUser?.savedCareers || [],
        savedCourses: currentUser?.savedCourses || [],
        savedExams: currentUser?.savedExams || [],
        savedScholarships: currentUser?.savedScholarships || [],
        toggleSaveItem,
        isItemSaved,
        activeCareer,
        setActiveCareer,
        activeRouteId,
        setActiveRouteId,
        completedSteps,
        toggleStepComplete,
        activeTab,
        setActiveTab,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        selectedDetailCareer,
        setSelectedDetailCareer
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
