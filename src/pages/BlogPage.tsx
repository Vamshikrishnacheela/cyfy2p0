import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Search, ArrowLeft, ArrowUpRight, Clock, Star, Flame, Loader2 } from 'lucide-react';
import { BLOG_POSTS as STATIC_BLOGS, BRAND_NAME } from '../constants';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { BlogPost } from '../types';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(STATIC_BLOGS as any[]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>(['All Intelligence']);

  const categories = ['All Intelligence', 'Threat Reports', 'Security Engineering', 'Compliance', 'Executive Strategy'];

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const fbBlogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];

        if (fbBlogs.length > 0) {
          // Merge static and firebase blogs, ensuring uniqueness by title or id
          const combined = [...fbBlogs, ...STATIC_BLOGS.filter(s => !fbBlogs.find(f => f.title === s.title))];
          setBlogs(combined as BlogPost[]);
        }
      } catch (error) {
        console.error("Error fetching blogs from Firebase:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const toggleFilter = (cat: string) => {
    setActiveFilters(prev => {
      if (cat === 'All Intelligence') {
        return ['All Intelligence'];
      }

      const withoutAll = prev.filter(f => f !== 'All Intelligence');
      
      if (prev.includes(cat)) {
        const newFilters = withoutAll.filter(f => f !== cat);
        return newFilters.length === 0 ? ['All Intelligence'] : newFilters;
      } else {
        return [...withoutAll, cat];
      }
    });
  };

  // Filter and Sort logic
  const filteredAndSortedBlogs = [...blogs]
    .filter(post => {
      if (activeFilters.includes('All Intelligence')) return true;
      return activeFilters.includes(post.category);
    })
    .sort((a, b) => {
      // Sort by: Featured first, then Most Read (readCount), then Recent (id or date)
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.readCount !== b.readCount) return b.readCount - a.readCount;
      return 0; // Default stability
    });

  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase mb-8 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Defense Command
        </a>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Synchronizing Intel Feed...</p>
          </div>
        ) : (
          <>
            <div className="mb-16">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-text-base"
              >
                Digital <span className="text-primary">Intelligence</span> Feed
              </motion.h1>
              <p className="text-text-muted max-w-2xl leading-relaxed">
                Stay ahead of the adversary with curated insights, technical deep-dives, and strategic global threat analysis from the {BRAND_NAME} Labs.
              </p>
            </div>

            {/* Categories / Filters */}
            <div className="flex flex-wrap gap-4 mb-12">
              {categories.map((cat) => {
                const isActive = activeFilters.includes(cat);
                return (
                  <button 
                    key={cat}
                    onClick={() => toggleFilter(cat)}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      isActive 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                        : 'border-border-base text-gray-500 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedBlogs.map((post, index) => (
                <motion.article
                  key={post.id || post.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative flex flex-col h-full glass rounded-3xl overflow-hidden border-border-base transition-all duration-500 hover:border-primary/50"
                >
                  <a href={post.link || '#'} target={post.link ? '_blank' : '_self'} rel="noopener noreferrer" className="flex flex-col h-full">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 to-transparent"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-[8px] font-bold text-primary uppercase tracking-widest">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="px-3 py-1 bg-secondary/20 backdrop-blur-md border border-secondary/30 rounded-full text-[8px] font-bold text-secondary uppercase tracking-widest flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-secondary" />
                            Featured
                          </span>
                        )}
                        {(post.readCount || 0) > 2000 && (
                          <span className="px-3 py-1 bg-rose-500/20 backdrop-blur-md border border-rose-500/30 rounded-full text-[8px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1">
                            <Flame className="w-2.5 h-2.5 fill-rose-500" />
                            Hot
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.date}</span>
                        <span>{(post.readCount || 0).toLocaleString()} Reads</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 text-text-base">
                        {post.title}
                      </h3>
                      
                      <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-6 border-t border-border-base flex items-center justify-between">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">By {post.author}</span>
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </a>
                  
                  {/* Highlight Overlay */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
