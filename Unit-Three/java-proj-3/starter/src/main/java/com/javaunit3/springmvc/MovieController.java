package com.javaunit3.springmvc;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.javaunit3.springmvc.model.MovieEntity;
import com.javaunit3.springmvc.model.VoteEntity;

@Controller
public class MovieController {

    @Autowired
    private BestMovieService bestMovieService;

    @Autowired
    private SessionFactory sessionFactory;

    @RequestMapping("/")
    public String getIndexPAge() {
        return "index";
    }

    @RequestMapping("/bestMovie")
    public String getBestMoviePage(Model model) {
        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();

        List<MovieEntity> movieEntityList = session.createQuery("from MovieEntity").list();
        movieEntityList.sort(Comparator.comparing(movieEntity -> movieEntity.getVotes().size()));

        MovieEntity movieWithMostVotes = movieEntityList.get(movieEntityList.size() - 1);
        List<String> voterNames = new ArrayList<>();

        for (VoteEntity vote : movieWithMostVotes.getVotes()) {
            voterNames.add(vote.getName());
        }

        String voterNamesList = String.join(",", voterNames);

        model.addAttribute("bestMovie", movieWithMostVotes.getTitle());
        model.addAttribute("bestMovieVoters", voterNamesList);

        session.getTransaction().commit();

        return "bestMovie";
    }

    @RequestMapping("/voteForBestMovieForm")
    public String voteForBestMovieFormPage(Model model) {

        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();

        List<MovieEntity> movieEntityList = session.createQuery("from MovieEntity").list();

        model.addAttribute("movies", movieEntityList);

        session.getTransaction().commit();

        return "voteForBestMovie";
    }

    @RequestMapping("/voteForBestMovie")
    public String voteForBestMovie(HttpServletRequest request, Model model) {
        String movie_id = request.getParameter("movieId");
        String voter_name = request.getParameter("voterName");

        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();

        MovieEntity movieEntity = (MovieEntity) session.get(MovieEntity.class, Integer.parseInt(movie_id));

        VoteEntity voteEntity = new VoteEntity();
        voteEntity.setName(voter_name);

        movieEntity.addVote(voteEntity);

        session.update(movieEntity);

        session.getTransaction().commit();

        // session.save(voteEntity);

        return "voteForBestMovie";
    }

    @RequestMapping("/addMovieForm")
    public String addMovieFormPage() {
        return "addMovie";
    }

    @RequestMapping("/addMovie")
    public String addMovie(HttpServletRequest request) {
        String movieTitle = request.getParameter("movieTitle");
        String maturityRating = request.getParameter("maturityRating");
        String genre = request.getParameter("genre");

        MovieEntity movieEntity = new MovieEntity();
        movieEntity.setTitle(movieTitle);
        movieEntity.setGenre(genre);
        movieEntity.setMaturityRating(maturityRating);

        // System.out.println(movieEntity.getGenre());
        // System.out.println(movieEntity.getTitle());
        // System.out.println(movieEntity.getMaturityRating());
        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();

        session.save(movieEntity);
        session.getTransaction().commit();

        return "/addMovie";

    }

}
